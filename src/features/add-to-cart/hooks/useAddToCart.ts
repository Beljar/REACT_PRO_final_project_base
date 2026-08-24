import { useAppDispatch } from 'shared/store/utils';
import { cartActions } from 'entities/cart';
import { useCallback } from 'react';

export const useAddToCart = () => {
	const dispatch = useAppDispatch();
	const addProductToCart = useCallback(
		(cartProduct: CartProduct) => {
			dispatch(cartActions.addCartProduct(cartProduct));
		},
		[dispatch]
	);

	return { addProductToCart };
};
