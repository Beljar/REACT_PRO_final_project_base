import s from './ProfilePage.module.css';
import classNames from 'classnames';
import { WithProtection } from 'entities/product';
import { ButtonBack, Button, Input } from 'shared/ui';

export const ProfilePage = WithProtection(() => {
	return (
		<>
			<ButtonBack />
			<h1 className={s['form__title']}>Мои данные</h1>
			<form className={classNames(s['form'], s['form'])}>
				<div className={s['form__row']}>
					<Input
						id='name'
						name='name'
						type='text'
						placeholder='Введите ваше имя'
						className={s['input']}
					/>
					<Input
						id='about'
						name='about'
						type='text'
						placeholder='Описание профессии'
						className={s['input']}
					/>
				</div>
				<div className={s['form__row']}>
					<Input
						id='avatar'
						name='avatar'
						type='url'
						placeholder='Введите ссылку на аватарку'
						className={s['input']}
					/>
					<Input
						id='email'
						name='email'
						type='email'
						placeholder='email'
						className={s['input']}
					/>
				</div>

				<Button type='submit' variant='secondary' className={s['maxContent']}>
					Сохранить
				</Button>
			</form>
			<h2 className={s['form__title']}>Изменить пароль</h2>
			<form className={classNames(s['form'], s['form'])}>
				<div className={classNames(s['form__row'], s['form__row_min'])}>
					<Input
						id='password'
						name='password'
						type='password'
						placeholder='Пароль'
						className={s['input']}
					/>
				</div>
				<Button type='submit' variant='secondary' className={s['maxContent']}>
					Сохранить
				</Button>
			</form>
		</>
	);
});
