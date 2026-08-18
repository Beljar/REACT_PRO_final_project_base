import { WithProtection } from '../../../shared/store/HOCs/WithProtection';
import { ButtonBack } from '../../../shared/ui/ButtonBack';
import { LikeButton } from 'features/like-product';
import { AddToCart } from 'features/add-to-cart';
import { ViewProductList } from 'features/view-product-list';


export const FavoritesPage = WithProtection(() => {

	return (
		<>
			<br />
			<ButtonBack />
			<ViewProductList Extras={LikeButton} CartActions={AddToCart} title='Избранные' isFavorite/>
		</>
	);
});
