import React from 'react';
import {notFound} from 'next/navigation';
import {getProductById} from '@/lib/api/index';
import {ProductSlider} from '@/components';
import PurchaseSection from './PurchaseSection';

interface ShirtProps {
	params: Promise<{id: string}>;
}

export default async function Shirt({params}: ShirtProps) {
	const {id} = await params;
	const response = await getProductById(id);

	if (!response) {
		notFound();
	}

	const {item: product} = response;

	const sliderImages = Object.values(product.imageData.urls).map((url, index) => ({
		src: url,
		alt: `Фото ${index + 1}`
	}));

	return (
		<div className="w-4/5 mx-auto my-12">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-7">
				<ProductSlider className="h-[50vh] lg:h-[60vh]" sliderImages={sliderImages} />
				<div className="flex flex-col items-center md:items-start gap-3 md:gap-5">
					<div className="font-bold text-2xl md:text-3xl">{product.name}</div>
					<div className="text-2xl font-semibold">{product.price} ₽</div>
					<PurchaseSection product={product} />
					<div className="flex flex-col gap-0.5 items-center md:items-start mt-6 md:mt-0">
						{[
							{key: 'material', label: 'Материал', value: product?.material},
							{key: 'color', label: 'Цвет', value: product?.color},
							{key: 'fit', label: 'Крой', value: product?.fit},
							{key: 'careInstructions', label: 'Уход', value: product?.careInstructions}
						].map(
							({key, label, value}) =>
								value && (
									<div key={key} className="text-gray-600">
										<span className="font-bold">{label}: </span>
										{value}
									</div>
								)
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
