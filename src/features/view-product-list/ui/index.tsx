import { useProducts } from 'entities/product';
import { WithQuery } from '../../../shared/store/HOCs/WithQuery';
import { CardList } from './card-list/CardList';

interface IViewProductListProps {
	title: string;
	isFavorite?: boolean;
	Extras?: React.FC<{product: Product}>;
	CartActions?: React.FC<{product: Product}>;
}

const CardListWithQuery = WithQuery(CardList);

export const ViewProductList: React.FC<IViewProductListProps> = ({title, isFavorite, Extras, CartActions}) => {
	const { products, isLoading, isError, error } = useProducts(isFavorite);

	return (
		<>
			<CardListWithQuery
				title={title}
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
				Extras={Extras}
				CartActions={CartActions}
			/>
		</>
	);
};
