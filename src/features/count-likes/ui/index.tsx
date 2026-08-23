import { useAppSelector } from 'shared/store/utils';
import { useProducts } from 'entities/product';
import { userSelectors } from 'entities/user';
import { isLiked } from 'shared/utils';

export const CountLikes = () => {
	const { products } = useProducts();
	const user = useAppSelector(userSelectors.getUser);

	const likeCount = products.filter((product) =>
		isLiked(product.likes, user?.id)
	).length;
	return <>{likeCount} </>;
};
