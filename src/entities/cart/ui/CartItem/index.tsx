import { ReactComponent as TrashIcon } from 'shared/assets/icons/trash.svg';
import { Link } from 'react-router-dom';
import s from './CartItem.module.css';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { Button } from 'shared/ui';
import { AddToCart } from 'features/add-to-cart';
import { cartActions } from 'entities/cart';
import { memo } from 'react';

// eslint-disable-next-line react/display-name
export const CartItem = memo((props: Product) => {
	const dispatch = useDispatch();
	const { id, name, images, price, discount } = props;

	const handleDelete = () => {
		dispatch(cartActions.deleteCartProduct(id));
	};
	return (
		<div className={classNames(s['cart-item'])}>
			<div className={classNames(s['cart-item__desc'])}>
				<img
					src={images}
					alt={name}
					className={classNames(s['cart-item__image'])}
				/>

				<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
					<div style={{ display: 'flex', gap: '20px', flexGrow: 1 }}>
						<Link
							className={classNames(s['cart-item__title'])}
							to={`/products/${id}`}>
							<h2>{name}</h2>
						</Link>

						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<AddToCart product={props} />

							<div className={classNames(s['cart-item__price'])}>
								<div className={classNames(s['price-big'], s['price-wrap'])}>
									<span
										className={classNames(s['price_old'], s['price_right'])}>
										{price}
									</span>
									<span className={classNames(s['price_discount'], s['price'])}>
										{price - discount}
									</span>
								</div>
							</div>
						</div>
						<Button
							variant='ghost'
							className={classNames(s['cart-item__bnt-trash'])}
							onClick={handleDelete}>
							<TrashIcon />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
});
