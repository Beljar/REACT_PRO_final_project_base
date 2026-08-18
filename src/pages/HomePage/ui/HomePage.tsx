import { WithProtection } from '../../../shared/store/HOCs/WithProtection';
import { ViewProductList } from 'features/view-product-list';
import { LikeButton } from 'features/like-product';
import { AddToCart } from 'features/add-to-cart';
import { LoadMore } from 'features/load-more-products';


export const HomePage = WithProtection(() => {

	return (
		<>
			<ViewProductList Extras={LikeButton} CartActions={AddToCart} title='Лакомство'/>
			<LoadMore />
		</>
	);
});
