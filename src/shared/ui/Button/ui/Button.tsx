import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import s from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	fullWidth?: boolean;
	isLoading?: boolean;
	children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = 'primary',
			size = 'medium',
			fullWidth = false,
			isLoading = false,
			disabled = false,
			className,
			children,
			...props
		},
		ref
	) => {
		return (
			<button
				ref={ref}
				className={classNames(
					s['button'],
					s[`button--${variant}`],
					s[`button--${size}`],
					{
						[s['button--full-width']]: fullWidth,
						[s['button--loading']]: isLoading,
					},
					className
				)}
				disabled={disabled || isLoading}
				{...props}>
				{isLoading ? <span className={s['button__spinner']}></span> : children}
			</button>
		);
	}
);

Button.displayName = 'Button';
