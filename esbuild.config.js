const fs = require('fs/promises');
const path = require('path');
const { spawn } = require('child_process');
const esbuild = require('esbuild');
const dotenv = require('dotenv');
const postcss = require('postcss');
const { transform } = require('@svgr/core');
const postcssConfig = require('./postcss.config.js');

const root = __dirname;
const outdir = path.join(root, 'dist');
const entryPoint = path.join(root, 'src', 'index.tsx');
const production = process.argv.includes('--production');
const open = !process.argv.includes('--no-open');
const port = Number(process.env.PORT) || 8080;
const env = dotenv.config({ path: path.join(root, '.env') }).parsed || {};

const cssPlugin = {
	name: 'postcss-and-css-modules',
	setup(build) {
		build.onLoad({ filter: /\.css$/ }, async ({ path: filePath }) => {
			const source = await fs.readFile(filePath, 'utf8');
			const result = await postcss(postcssConfig.plugins).process(source, {
				from: filePath,
				map: false,
			});

			return {
				contents: result.css,
				loader: filePath.endsWith('.module.css') ? 'local-css' : 'css',
				resolveDir: path.dirname(filePath),
			};
		});
	},
};

const svgPlugin = {
	name: 'svg-url-and-component',
	setup(build) {
		build.onResolve({ filter: /^svg-url:/ }, ({ path: importPath }) => ({
			path: importPath.slice('svg-url:'.length),
			namespace: 'svg-file',
		}));

		build.onLoad(
			{ filter: /.*/, namespace: 'svg-file' },
			async ({ path: filePath }) => ({
				contents: await fs.readFile(filePath),
				loader: 'file',
			})
		);

		build.onLoad({ filter: /\.svg$/ }, async ({ path: filePath }) => {
			const source = await fs.readFile(filePath, 'utf8');
			const componentName = `${path
				.basename(filePath, '.svg')
				.split(/[^a-zA-Z0-9]+/)
				.filter(Boolean)
				.map((part) => part[0].toUpperCase() + part.slice(1))
				.join('')}Svg`;
			const component = await transform(
				source,
				{
					exportType: 'named',
					jsxRuntime: 'automatic',
					namedExport: 'ReactComponent',
					plugins: ['@svgr/plugin-jsx'],
				},
				{ componentName }
			);

			return {
				contents: `import svgUrl from ${JSON.stringify(
					`svg-url:${filePath}`
				)};\n${component}\nexport default svgUrl;`,
				loader: 'jsx',
				resolveDir: path.dirname(filePath),
			};
		});
	},
};

const htmlPlugin = {
	name: 'html-template',
	setup(build) {
		build.onEnd(async (result) => {
			if (result.errors.length || !result.metafile) return;

			const entryOutput = Object.entries(result.metafile.outputs).find(
				([, output]) =>
					output.entryPoint &&
					path.resolve(root, output.entryPoint) === entryPoint
			);
			if (!entryOutput)
				throw new Error('Could not find the esbuild entry output');

			const [scriptPath, output] = entryOutput;
			const publicPath = (filePath) =>
				`/${path
					.relative(outdir, path.resolve(root, filePath))
					.replace(/\\/g, '/')}`;
			const stylesheet = output.cssBundle
				? `\n\t<link rel="stylesheet" href="${publicPath(output.cssBundle)}">`
				: '';
			const liveReload = production
				? ''
				: `\n\t<script>new EventSource('/esbuild').addEventListener('change', () => location.reload())</script>`;
			const template = await fs.readFile(
				path.join(root, 'public', 'index.html'),
				'utf8'
			);
			const html = template
				.replace('</head>', `${stylesheet}\n</head>`)
				.replace(
					'</body>',
					`\t<script type="module" src="${publicPath(
						scriptPath
					)}"></script>${liveReload}\n</body>`
				);

			await fs.writeFile(path.join(outdir, 'index.html'), html);
		});
	},
};

const define = {
	'process.env.NODE_ENV': JSON.stringify(
		production ? 'production' : 'development'
	),
	...Object.fromEntries(
		Object.entries(env).map(([key, value]) => [
			`process.env.${key}`,
			JSON.stringify(value),
		])
	),
};

const buildOptions = {
	absWorkingDir: root,
	entryPoints: [entryPoint],
	outdir,
	bundle: true,
	format: 'esm',
	platform: 'browser',
	target: ['es2017'],
	splitting: true,
	metafile: true,
	sourcemap: production ? false : 'inline',
	minify: production,
	entryNames: production
		? 'static/scripts/[name].[hash]'
		: 'static/scripts/[name]',
	chunkNames: production
		? 'static/scripts/[name].[hash]'
		: 'static/scripts/[name]',
	assetNames: production
		? 'static/assets/[name].[hash]'
		: 'static/assets/[name]',
	loader: {
		'.png': 'file',
		'.jpg': 'file',
		'.jpeg': 'file',
		'.gif': 'file',
		'.webp': 'file',
		'.woff': 'file',
		'.woff2': 'file',
		'.eot': 'file',
		'.ttf': 'file',
		'.otf': 'file',
	},
	alias: Object.fromEntries(
		['app', 'entities', 'features', 'pages', 'shared', 'widgets'].map(
			(name) => [name, path.join(root, 'src', name)]
		)
	),
	define,
	plugins: [cssPlugin, svgPlugin, htmlPlugin],
	logLevel: 'info',
};

function openBrowser(url) {
	const commands = {
		darwin: ['open', [url]],
		linux: ['xdg-open', [url]],
		win32: ['cmd', ['/c', 'start', '', url]],
	};
	const [command, args] = commands[process.platform] || commands.linux;
	spawn(command, args, { detached: true, stdio: 'ignore' }).unref();
}

async function run() {
	await fs.rm(outdir, { force: true, recursive: true });

	if (production) {
		await esbuild.build(buildOptions);
		return;
	}

	const context = await esbuild.context(buildOptions);
	const server = await context.serve({
		fallback: path.join(outdir, 'index.html'),
		host: 'localhost',
		port,
		servedir: outdir,
	});
	const url = `http://localhost:${server.port}`;
	console.log(`Development server: ${url}`);
	if (open) openBrowser(url);

	const stop = async () => {
		await context.dispose();
		process.exit(0);
	};
	process.once('SIGINT', stop);
	process.once('SIGTERM', stop);
}

run().catch((error) => {
	console.error(error);
	process.exit(1);
});
