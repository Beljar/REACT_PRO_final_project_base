import { ProductList } from 'widgets/ProductList';
import { LoadMore } from 'features/load-more-products';
import { WithProtection } from 'entities/product/HOCs/WithProtection';

export const HomePage = WithProtection(() => {
	return (
		<>
			<ProductList title='Лакомство' />
			<LoadMore />
		</>
	);
});
