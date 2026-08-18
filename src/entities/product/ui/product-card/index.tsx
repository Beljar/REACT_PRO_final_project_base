import classNames from 'classnames';
import s from './Card.module.css';
import { Price } from './Price/ui/Price';
import { Link } from 'react-router-dom';
import React from 'react';

type CardProps = {
	product: Product;
	Extras?: React.FC<{product: Product}>;
	CartActions?: React.FC<{product: Product}>;
};
export const Card = ({ product, Extras, CartActions }: CardProps) => {
	const { discount, price, name, tags, id, images } = product;

	return (
		<article className={s['card']}>
			<div
				className={classNames(
					s['card__sticky'],
					s['card__sticky_type_top-left']
				)}>
				<span className={s['card__discount']}>{discount}</span>
				{tags.length > 0 &&
					tags.map((t) => (
						<span key={t} className={classNames(s['tag'], s['tag_type_new'])}>
							{t}
						</span>
					))}
			</div>
			{Extras ? (
				<div
					className={classNames(
						s['card__sticky'],
						s['card__sticky_type_top-right']
					)}>
						<Extras product={product}/>
					</div>
			) : null}
			<Link className={s['card__link']} to={`/products/${id}`}>
				<img
					src={images}
					alt={name}
					className={s['card__image']}
					loading='lazy'
				/>
				<div className={s['card__desc']}>
					<Price price={price} discountPrice={discount} />
					<h3 className={s['card__name']}>{name}</h3>
				</div>
			</Link>
			{CartActions ? <CartActions product={product}/> : null}
		</article>
	);
};
