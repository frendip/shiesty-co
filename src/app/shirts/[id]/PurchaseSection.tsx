'use client';

import React from 'react';
import type {Product} from '@/types/product';
import {CommonButton, SelectorButton} from '@/components/ui/buttons';

interface PurchaseSectionProps {
	product: Product;
}

export default function PurchaseSection({product}: PurchaseSectionProps) {
	return (
		<div className="flex flex-col gap-3 items-center md:items-start">
			<div className="flex items-center flex-col md:items-start gap-2">
				<div className="font-semibold">Размер:</div>
				<div className="flex gap-1.5">
					{product.sizes.map((size) => (
						<SelectorButton key={size} className="px-5 py-3">
							{size}
						</SelectorButton>
					))}
				</div>
			</div>
			<CommonButton className={`py-4 px-14 md:px-10`}>Приобрести</CommonButton>
		</div>
	);
}
