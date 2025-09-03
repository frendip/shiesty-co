import {PurchaseForm} from '@/components/ui';
import type {Dispatch, SetStateAction} from 'react';

interface FormData {
	size: 'M' | 'L';
	fullName: string;
	cdekAddress: string;
	phoneNumber: string;
}

interface PurchaseProps {
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function Purchase({setIsOpen}: PurchaseProps) {
	const onSubmit = (data: FormData) => {
		const message = `Привет! Я выбрал футболку размера ${data.size}

ФИО: ${data.fullName}
Адрес пункта выдачи CDEK: ${data.cdekAddress}
Номер телефона: ${data.phoneNumber}`;

		const telegramUrl = `https://t.me/shiestymanager?text=${encodeURIComponent(message)}`;
		window.open(telegramUrl, '_blank');
		setIsOpen(false);
	};

	return (
		<div>
			<div className="pb-4">
				<p className="text-gray-600 leading-relaxed">
					Выберите нужный размер, заполните необходимую информацию и свяжитесь с нами в Telegram для оформления заказа.
				</p>
			</div>

			<PurchaseForm onSubmit={onSubmit} />
		</div>
	);
}

export default Purchase;
