import { cartSelectors } from 'entities/cart';
import { useAppSelector } from 'shared/store/utils';

export const CountCartProducts = () => {
	const cartProducts = useAppSelector(cartSelectors.getCartProducts);
	return <>{cartProducts.length} </>;
};
