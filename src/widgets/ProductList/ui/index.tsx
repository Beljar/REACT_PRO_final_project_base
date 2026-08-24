import { useProducts, WithQuery } from 'entities/product';
import { CardList } from './card-list/CardList';

interface IProductListProps {
	title: string;
	isFavorite?: boolean;
}

const CardListWithQuery = WithQuery(CardList);

export const ProductList: React.FC<IProductListProps> = ({
	title,
	isFavorite,
}) => {
	const { products, isLoading, isError, error } = useProducts(isFavorite);

	return (
		<>
			<CardListWithQuery
				title={title}
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
		</>
	);
};
