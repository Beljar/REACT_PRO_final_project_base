import s from './CartPage.module.css';
import classNames from 'classnames';
import { cartSelectors } from 'entities/cart';
import { CheckoutCart } from 'features/checkout-cart';
import { useAppSelector } from 'shared/store';
import { CartList } from 'widgets/CartList';

export const CartPage = () => {
	const products = useAppSelector(cartSelectors.getCartProducts);

	if (!products.length) {
		return <h1 className='header-title'>Товаров нет корзине</h1>;
	}

	return (
		<div className={classNames(s['content'], s['container'])}>
			<div className={classNames(s['content-cart'])}>
				<div className={classNames(s['cart-title'])}>
					<span>{products.length}</span> в корзине
				</div>
				<CartList />
				<CheckoutCart />
			</div>
		</div>
	);
};
