/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { createPortal } from 'react-dom';

import styles from './styles.module.css';
import { useRef } from 'react';
import { useHandlers } from './useHandlers';
import { Button } from '../Button';

interface ModalProps {
	isOpen: boolean;
	title?: string;
	children: React.ReactNode;
	onClose: () => void;
}

export const Modal = ({ isOpen, title, children, onClose }: ModalProps) => {
	const closeBtnRef = useRef<HTMLButtonElement>(null);

	const portalRoot = document.getElementById('modal-root');

	useHandlers({
		isOpen,
		closeBtnRef,
		portalRoot,
		onClose,
	});

	if (!portalRoot) {
		console.error('Modal root element not found');
		return null;
	}
	if (!isOpen) {
		return null;
	}
	return createPortal(
		<div className={styles.modalOverlay} onClick={onClose} role='presentation'>
			<div
				className={styles.modal}
				onClick={(e) => e.stopPropagation()}
				role='dialog'
				aria-modal='true'>
				<div className={styles.modalBody}>
					<Button
						variant='ghost'
						className={styles.closeButton}
						ref={closeBtnRef}
						onClick={onClose}
						aria-label='Close modal'>
						×
					</Button>
					<div className={styles.modalHeader}>{title && <h2>{title}</h2>}</div>

					<div className={styles.modalContent}>{children}</div>
				</div>
			</div>
		</div>,
		portalRoot
	);
};
