import { WithProtection } from '../../../shared/store/HOCs/WithProtection';
import { ProductList } from 'widgets/ProductList';
import { LoadMore } from 'features/load-more-products';

export const HomePage = WithProtection(() => {
	return (
		<>
			<ProductList title='Лакомство' />
			<LoadMore />
		</>
	);
});
