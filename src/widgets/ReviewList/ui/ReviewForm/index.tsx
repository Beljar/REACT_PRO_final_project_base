import { Button } from 'shared/ui';
import classNames from 'classnames';
import s from './ReviewForm.module.css';
import { Modal } from 'shared/ui/Modal';
import { ReviewForm } from './ReviewForm';
import { useState } from 'react';

export const PostReview = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<Button
				type='submit'
				variant='primary'
				className={classNames(s['form__btn'], s['pramary'])}
				onClick={() => setIsOpen(true)}>
				Оставить отзыв
			</Button>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<ReviewForm />
			</Modal>
		</>
	);
};
