import { CartItem, cartSelectors } from 'entities/cart';
import s from './CartList.module.css';
import classNames from 'classnames';
import { useAppSelector } from 'shared/store';
import { AddToCart } from 'features/add-to-cart';

export const CartList = () => {
	const products = useAppSelector(cartSelectors.getCartProducts);

	return (
		<div className={classNames(s['cart-list'])}>
			{products.map((p) => (
				<CartItem key={p.id} product={p} CartActions={AddToCart} />
			))}
		</div>
	);
};
