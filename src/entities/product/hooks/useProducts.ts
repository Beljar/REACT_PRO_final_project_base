import { useLocation } from 'react-router-dom';
import { isLiked } from '../../../shared/utils';
import { productsSelectors } from '../../../entities/product/model';
import { useGetProductsQuery } from '../../../entities/product/api';
import { userSelectors } from 'entities/user';
import { useAppSelector } from 'shared/store/utils';

export const useProducts = (isFavorite?: boolean) => {

	const { searchText, page, perPage, sort } = useAppSelector(
		productsSelectors.getProductsState
	);

	const { isLoading, isError, error, data, isFetching } = useGetProductsQuery({
		searchText,
		sort,
		page,
		perPage: isFavorite ? undefined : perPage,
	});

	let products = data?.products || [];

	const user = useAppSelector(userSelectors.getUser);

	if (isFavorite) {
		products = products.filter((product) => isLiked(product.likes, user?.id));
	}

	const productsCount = data?.length || 0;

	return {
		products,
		isLoading,
		isError,
		isFetching,
		error,
		productsCount,
	};
};
