import { useCallback, useEffect } from 'react';

interface IUseHandlersProps {
	isOpen: boolean;
	closeBtnRef: React.RefObject<HTMLButtonElement>;
	portalRoot: HTMLElement | null;
	onClose: () => void;
}

export const useHandlers = ({
	isOpen,
	closeBtnRef,
	portalRoot,
	onClose,
}: IUseHandlersProps) => {
	const handleEscape = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			onClose();
		}
	};
	const handleFocusOut = useCallback(
		(ev: FocusEvent) => {
			if (
				closeBtnRef.current &&
				portalRoot &&
				(!ev.relatedTarget || !portalRoot.contains(ev.relatedTarget as Node))
			) {
				closeBtnRef.current.focus();
			}
		},
		[closeBtnRef, portalRoot]
	);
	useEffect(() => {
		if (!isOpen) return;
		const triggerElement = document.activeElement;
		if (closeBtnRef.current) {
			closeBtnRef.current.focus();
		}
		document.addEventListener('keydown', handleEscape);
		document.addEventListener('focusin', handleFocusOut);
		return () => {
			if (triggerElement instanceof HTMLElement) {
				triggerElement.focus();
			}
			document.removeEventListener('keydown', handleEscape);
			portalRoot?.removeEventListener('focusout', handleFocusOut);
		};
	}, [isOpen, handleFocusOut]);
};
