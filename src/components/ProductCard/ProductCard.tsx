'use client';

import Image from 'next/image';
import {useState} from 'react';
import {CommonButton, Modal} from '@/components/ui';
import classes from './ProductCard.module.css';
import Purchase from './Purchase';

interface ProductCardProps {
	name: string;
	price: string;
}

export default function ProductCard({name, price}: ProductCardProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);

	return (
		<>
			<div className={`rounded-lg p-6 h-[500px] flex flex-col justify-between ${classes['glassEffect']}`}>
				<h2 className="text-xl text-center font-semibold text-gray-900 mb-2">{name}</h2>
				<Image
					src={isHovered ? '/front-tshirt.png' : '/back-tshirt.png'}
					width={350}
					height={272.5}
					alt={name}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				/>

				<div className="flex flex-col gap-3 items-center">
					<p className="text-center text-2xl font-bold text-gray-900">{price} ₽</p>
					<CommonButton onClick={() => setIsPurchaseOpen(true)}>Приобрести</CommonButton>
				</div>
			</div>

			<Modal isOpen={isPurchaseOpen} title="Оформление заказа" onClose={() => setIsPurchaseOpen(false)}>
				<Purchase setIsOpen={setIsPurchaseOpen} />
			</Modal>
		</>
	);
}
