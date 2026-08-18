import { useCount } from '../hooks/useCount';
import s from './CartCounter.module.css';
import classNames from 'classnames';
import { Button, Input } from '../../';

type TCartCounter = {
	productId: string;
};
export const CartCounter = ({ productId }: TCartCounter) => {
	const { count, stock, handleSetCount, handleIncrement, handleDecrement } =
		useCount(productId);

	return (
		<>
			<div className={classNames(s['button-count'])}>
				<Button
					onClick={handleDecrement}
					variant='ghost'
					size='small'
					className={classNames(s['button-count__minus'])}>
					-
				</Button>
				<Input
					onChange={handleSetCount}
					type='number'
					className={classNames(s['button-count__num'])}
					value={count}
				/>
				<Button
					onClick={handleIncrement}
					variant='ghost'
					size='small'
					disabled={count >= stock}
					className={classNames(s['button-count__plus'])}>
					+
				</Button>
			</div>
		</>
	);
};
