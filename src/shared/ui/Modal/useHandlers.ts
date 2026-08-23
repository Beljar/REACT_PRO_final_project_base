import { useEffect } from 'react';

interface IUseHandlersProps {
	isOpen: boolean;
	closeBtnRef: React.RefObject<HTMLButtonElement | null>;
	modalRef: React.RefObject<HTMLDivElement | null>;
	onClose: () => void;
}

export const useHandlers = ({
	isOpen,
	closeBtnRef,
	modalRef,
	onClose,
}: IUseHandlersProps) => {
	const handleEscape = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			onClose();
		}
	};

	useEffect(() => {
		if (!isOpen) return;
		const triggerElement = document.activeElement;
		if (closeBtnRef.current) {
			closeBtnRef.current.focus();
		}
		const modalElement = modalRef.current;
		if (!modalElement) return
		const focusableElements = Array.from(modalElement.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		)) as HTMLElement[];
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		const handleTabKeyPress = (event: KeyboardEvent) => {
			if (event.key === "Tab") {
				if (event.shiftKey && document.activeElement === firstElement) {
					event.preventDefault();
					lastElement.focus();
				} else if (
					!event.shiftKey &&
					document.activeElement === lastElement
				) {
					event.preventDefault();
					firstElement.focus();
				}
			}
		};
		modalElement.addEventListener("keydown", handleTabKeyPress);
		document.addEventListener('keydown', handleEscape);
		return () => {
			if (triggerElement instanceof HTMLElement) {
				triggerElement.focus();
			}
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen]);
};
