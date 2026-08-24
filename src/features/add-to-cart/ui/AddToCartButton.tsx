import { Button } from 'shared/ui';
import classNames from 'classnames';
import s from './AddToCart.module.css';
import { memo } from 'react';

interface IAddToCartButton {
	onAddProduct: () => void;
}

// eslint-disable-next-line react/display-name
export const AddToCartButton = memo(({ onAddProduct }: IAddToCartButton) => {
	return (
		<Button
			onClick={onAddProduct}
			className={classNames(
				s['card__cart'],
				s['card__btn'],
				s['card__btn_type_primary']
			)}>
			В корзину
		</Button>
	);
});
