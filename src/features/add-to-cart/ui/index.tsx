import { cartSelectors } from 'entities/cart';
import { useAppSelector } from 'shared/store/utils';
import { CartCounter } from './CartCounter';
import { Button } from 'shared/ui';
import { useAddToCart } from '../hooks/useAddToCart';
import classNames from 'classnames';
import s from './AddToCart.module.css';

type TAddToCart = {
	product: Product;
};

export const AddToCart: React.FC<TAddToCart> = ({ product }) => {
	const cartProducts = useAppSelector(cartSelectors.getCartProducts);
	const isProductInCart = cartProducts.some((p) => p.id === product.id);
	const { addProductToCart } = useAddToCart();
	return (
		<>
			{isProductInCart ? (
				<CartCounter product={product} />
			) : (
				<Button
					onClick={() => addProductToCart({ ...product, count: 1 })}
					disabled={isProductInCart}
					className={classNames(
						s['card__cart'],
						s['card__btn'],
						s['card__btn_type_primary']
					)}>
					В корзину
				</Button>
			)}
		</>
	);
};
