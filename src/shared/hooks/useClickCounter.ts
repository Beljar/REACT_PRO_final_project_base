import { RefObject, useEffect, useRef } from 'react';

export const useClickCounter = (elRef: RefObject<HTMLElement | null>) => {
	const counterRef = useRef<number>(0);
	const onCount = () => {
		counterRef.current += 1;
		console.log(`сделано ${counterRef.current} кликов`);
	};

	useEffect(() => {
		if (!elRef.current) return;
		elRef.current.addEventListener('click', onCount);
		return () => {
			if (elRef.current) {
				elRef.current.removeEventListener('click', onCount);
			}
		};
	}, [elRef]);
};
