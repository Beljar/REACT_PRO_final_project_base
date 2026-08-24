import s from './LikeButton.module.css';
import { ReactComponent as LikeSvg } from 'shared/assets/icons/like.svg';
import classNames from 'classnames';

import {
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
} from 'entities/product';
import { toast } from 'react-toastify';
import { userSelectors } from 'entities/user';
import { IErrorResponse } from 'entities/product/api';
import { Button } from 'shared/ui';
import { memo, useEffect, useOptimistic, useState, useTransition } from 'react';
import { useAppSelector } from 'shared/store/utils';

type TLikeButtonProps = {
	product: Product;
};
// eslint-disable-next-line react/display-name
export const LikeButton = memo(({ product }: TLikeButtonProps) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isPending, startTransition] = useTransition();
	const accessToken = useAppSelector(userSelectors.getAccessToken);
	const user = useAppSelector(userSelectors.getUser);

	const [setLike] = useSetLikeProductMutation();
	const [deleteLike] = useDeleteLikeProductMutation();

	const [isLike, setIsLike] = useState(
		product?.likes.some((l) => l.userId === user?.id)
	);
	const [hasOptimisticLike, setHasOptimisticLike] = useOptimistic(isLike);

	useEffect(() => {
		setIsLike(product?.likes.some((l) => l.userId === user?.id));
	}, [product, user]);

	const toggleLike = () =>
		startTransition(async () => {
			if (!accessToken) {
				toast.warning('Вы не авторизованы');
				return;
			}
			setHasOptimisticLike((prev) => !prev);
			let response;
			try {
				if (isLike) {
					response = await deleteLike({ id: `${product.id}` });
				} else {
					response = await setLike({ id: `${product.id}` });
				}

				if (response.error) {
					const error = response.error as IErrorResponse;
					toast.error(error.data.message);
				} else {
					setIsLike((prev) => !prev);
				}
			} catch (e) {
				console.error(e);
			}
		});

	return (
		<Button
			variant='ghost'
			className={classNames(s['card__favorite'], {
				[s['card__favorite_is-active']]: hasOptimisticLike,
			})}
			onClick={toggleLike}>
			<LikeSvg />
		</Button>
	);
});
