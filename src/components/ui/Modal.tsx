'use client';

import {useEffect} from 'react';
import CloseIcon from '@/assets/close.svg';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
}

export default function Modal({isOpen, onClose, title, children}: ModalProps) {
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center" onClick={onClose}>
			<div
				className={'bg-white rounded-lg w-[min(calc(100%-2rem),32rem)] max-h-[75vh] flex flex-col'}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="bg-white rounded-t-lg shrink-0 flex justify-between items-center p-6 border-b border-gray-200">
					<div className="text-black text-lg">{title}</div>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
						aria-label="Закрыть модальное окно"
					>
						<CloseIcon />
					</button>
				</div>

				<div className="p-6 overflow-auto flex-1">{children}</div>
			</div>
		</div>
	);
}
