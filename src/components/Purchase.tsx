import {PurchaseForm} from '@/components/ui';
import type {Dispatch, SetStateAction} from 'react';
import type {Product} from '@/types/product';
import type {FormData} from '@/components/ui/PurchaseForm';

const INTERPRETER = {
	shirts: 'футболку'
} as const;

interface PurchaseProps {
	product: Product;
	activeSize?: string;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function Purchase({product, activeSize, setIsOpen}: PurchaseProps) {
	const onSubmit = (data: FormData) => {
		const message = `Привет! Я выбрал ${INTERPRETER[product.category] || 'изделие'} размера ${data.size}

ФИО: ${data.fullName}
Адрес пункта выдачи CDEK: ${data.cdekAddress}
Номер телефона: ${data.phoneNumber}`;

		const telegramUrl = `https://t.me/shiestymanager?text=${encodeURIComponent(message)}`;
		window.open(telegramUrl, '_blank');
		setIsOpen(false);
	};

	const title = `${
		activeSize ? 'З' : 'Выберите нужный размер, з'
	}аполните необходимую информацию и свяжитесь с нами в Telegram для
					оформления заказа.`;

	return (
		<div>
			<div className="pb-4">
				<p className="text-gray-600 leading-relaxed">{title}</p>
			</div>

			<PurchaseForm sizes={product.sizes} activeSize={activeSize} onSubmit={onSubmit} />
		</div>
	);
}

export default Purchase;
