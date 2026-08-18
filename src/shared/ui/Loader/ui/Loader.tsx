import classNames from 'classnames';
import s from './Loader.module.css';

export type LoaderSize = 'small' | 'medium' | 'large';
export type LoaderVariant = 'default' | 'circle';

interface LoaderProps {
	size?: LoaderSize;
	variant?: LoaderVariant;
	className?: string;
}

export const Loader = ({
	size = 'medium',
	variant = 'default',
	className,
}: LoaderProps) => {
	return (
		<div className={classNames(s['wrapper'], s[`wrapper--${size}`], className)}>
			{variant === 'default' ? (
				<div className={classNames(s['loader'])}>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			) : (
				<div className={classNames(s['loader-circle'])}></div>
			)}
		</div>
	);
};
