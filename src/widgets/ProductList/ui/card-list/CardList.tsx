import { Card } from 'entities/product';
import s from './CardList.module.css';
import { LikeButton } from 'features/like-product';
import { AddToCart } from 'features/add-to-cart';

type CardListProps = {
	title: string;
	products: Product[];
};
export const CardList = ({ title, products }: CardListProps) => {
	if (!products.length) {
		return <h1 className='header-title'>Товар не найден</h1>;
	}

	return (
		<div className={s['card-list']}>
			<div className={s['card-list__header']}>
				<h2 className={s['card-list__title']}>{title}</h2>
			</div>
			<div className={s['card-list__items']}>
				{products.map((product) => (
					<Card
						key={product.id}
						product={product}
						Extras={LikeButton}
						CartActions={AddToCart}
					/>
				))}
			</div>
		</div>
	);
};
