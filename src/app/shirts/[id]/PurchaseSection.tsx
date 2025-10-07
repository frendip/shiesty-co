'use client';

import React, {useState} from 'react';
import type {Product} from '@/types/product';
import {CommonButton, SelectorButton} from '@/components/ui/buttons';
import {Modal} from '@/components/ui';
import {Purchase} from '@/components';

interface PurchaseSectionProps {
	product: Product;
}

export default function PurchaseSection({product}: PurchaseSectionProps) {
	const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
	const [activeSize, setActiveSize] = useState(product.sizes[0]);

	return (
		<>
			<div className="flex flex-col gap-3 items-center md:items-start">
				<div className="flex items-center flex-col md:items-start gap-2">
					<div className="font-semibold">Размер:</div>
					<div className="flex gap-1.5">
						{product.sizes.map((size) => (
							<SelectorButton
								key={size}
								className="px-5 py-3"
								onClick={() => {
									setActiveSize(size);
								}}
								isActive={activeSize === size}
							>
								{size}
							</SelectorButton>
						))}
					</div>
				</div>
				<CommonButton className={`py-4 px-14 md:px-10`} onClick={() => setIsPurchaseOpen(true)}>
					Приобрести
				</CommonButton>
			</div>

			<Modal isOpen={isPurchaseOpen} title="Оформление заказа" onClose={() => setIsPurchaseOpen(false)}>
				<Purchase product={product} activeSize={activeSize} setIsOpen={setIsPurchaseOpen} />
			</Modal>
		</>
	);
}
