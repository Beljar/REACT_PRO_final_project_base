import { WithProtection } from 'entities/product';
import { ButtonBack } from '../../../shared/ui/ButtonBack';
import { ProductList } from 'widgets/ProductList';

export const FavoritesPage = WithProtection(() => {
	return (
		<>
			<br />
			<ButtonBack />
			<ProductList title='Избранные' isFavorite />
		</>
	);
});
