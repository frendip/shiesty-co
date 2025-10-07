import {PurchaseForm} from '@/components/ui';
import type {Dispatch, SetStateAction} from 'react';
import type {Product} from '@/types/product';
import type {FormData} from '@/components/ui/PurchaseForm';

const INTERPRETER = {
	shirts: 'футболку'
} as const;

interface PurchaseProps {
	product: Product;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function Purchase({product, setIsOpen}: PurchaseProps) {
	const onSubmit = (data: FormData) => {
		const message = `Привет! Я выбрал ${INTERPRETER[product.category] || 'изделие'} размера ${data.size}

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

			<PurchaseForm sizes={product.sizes} onSubmit={onSubmit} />
		</div>
	);
}

export default Purchase;
