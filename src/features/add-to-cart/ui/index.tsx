import { cartSelectors } from 'entities/cart';
import { useAppSelector } from 'shared/store/utils';
import { CartCounter } from './CartCounter';
import { Button } from 'shared/ui';
import { useAddToCart } from '../hooks/useAddToCart';

import { useCallback } from 'react';
import { AddToCartButton } from './AddToCartButton';

type TAddToCart = {
	product: Product;
};

export const AddToCart: React.FC<TAddToCart> = ({ product }) => {
	const cartProducts = useAppSelector(cartSelectors.getCartProducts);
	const isProductInCart = cartProducts.some((p) => p.id === product.id);
	const { addProductToCart } = useAddToCart();
	const onAddProduct = useCallback(() => {
		addProductToCart({ ...product, count: 1 });
	}, [product, addProductToCart]);
	return (
		<>
			{isProductInCart ? (
				<CartCounter product={product} />
			) : (
				<AddToCartButton onAddProduct={onAddProduct} />
			)}
		</>
	);
};
