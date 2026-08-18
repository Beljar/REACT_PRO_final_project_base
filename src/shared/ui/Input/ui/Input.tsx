import React, { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import s from './Input.module.css';

export type InputType =
	| 'text'
	| 'email'
	| 'password'
	| 'number'
	| 'url'
	| 'tel'
	| 'search';
export type InputSize = 'small' | 'medium' | 'large';

interface InputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
	label?: string;
	error?: string;
	size?: InputSize;
	fullWidth?: boolean;
	icon?: React.ReactNode;
	iconPosition?: 'left' | 'right';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			error,
			size = 'medium',
			fullWidth = false,
			icon,
			iconPosition = 'left',
			className,
			...props
		},
		ref
	) => {
		return (
			<div
				className={classNames(s['input-wrapper'], {
					[s['input-wrapper--full-width']]: fullWidth,
				})}>
				{label && <label className={s['input-label']}>{label}</label>}
				<div
					className={classNames(s['input-container'], {
						[s[`input-container--${size}`]]: size,
						[s['input-container--with-icon']]: icon,
					})}>
					{icon && iconPosition === 'left' && (
						<span
							className={classNames(s['input-icon'], s['input-icon--left'])}>
							{icon}
						</span>
					)}
					<input
						ref={ref}
						className={classNames(
							s['input'],
							{
								[s['input--error']]: error,
								[s['input--with-icon-left']]: icon && iconPosition === 'left',
								[s['input--with-icon-right']]: icon && iconPosition === 'right',
							},
							className
						)}
						{...props}
					/>
					{icon && iconPosition === 'right' && (
						<span
							className={classNames(s['input-icon'], s['input-icon--right'])}>
							{icon}
						</span>
					)}
				</div>
				{error && <span className={s['input-error']}>{error}</span>}
			</div>
		);
	}
);

Input.displayName = 'Input';
