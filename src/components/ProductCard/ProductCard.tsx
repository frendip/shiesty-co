'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import {useGLTF, useEnvironment} from '@react-three/drei';
import {useState, useEffect} from 'react';
import {useMedia} from 'react-use';
import {CommonButton} from '@/components/ui/buttons';
import {Modal} from '@/components/ui';
import LoaderIcon from '@/assets/loader.svg';
import {Purchase} from '@/components';
import classes from './ProductCard.module.css';
import type {Product} from '@/types/product';

const TShirtModel = dynamic(() => import('@/components/TShirtModel'), {
	ssr: false,
	loading: () => <LoaderIcon width="116" height="116" />
});

interface ProductCardProps {
	product: Product;
}

function ProductImage({imageData, name}: {imageData: Product['imageData']; name: string}) {
	const [isHovered, setIsHovered] = useState(false);
	const [isTouchDevice, setIsTouchDevice] = useState(false);

	useEffect(() => {
		setIsTouchDevice(navigator.maxTouchPoints > 0 && !window.matchMedia('(hover: hover)').matches);
	}, []);

	const handleMouseEnter = () => {
		if (!isTouchDevice) {
			setIsHovered(true);
		}
	};

	const handleMouseLeave = () => {
		if (!isTouchDevice) {
			setIsHovered(false);
		}
	};

	const handleClick = () => {
		if (isTouchDevice) {
			setIsHovered((prev) => !prev);
		}
	};

	return (
		<div className="relative">
			<Image
				src={imageData.urls.back}
				width={350}
				height={272.5}
				alt={`${name} back`}
				className={`${isHovered ? 'opacity-0' : 'opacity-100'}`}
				priority
			/>
			<Image
				src={imageData.urls.front}
				width={350}
				height={272.5}
				alt={`${name} front`}
				className={`absolute inset-0 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleClick}
				priority
			/>
		</div>
	);
}

export default function ProductCard({product}: ProductCardProps) {
	const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
	const [viewFormat, setViewFormat] = useState<'2d' | '3d'>('2d');

	const isMobile = useMedia('(max-width: 640px)', false);

	const onClickModelViewButton = () => {
		setViewFormat((prevView) => (prevView === '2d' ? '3d' : '2d'));
	};

	useEffect(() => {
		if (product.modelData?.url) {
			useGLTF.preload(product.modelData.url);
			useEnvironment.preload({preset: 'warehouse'});
		}
	}, [product.modelData?.url]);

	return (
		<>
			<div
				className={`h-[430px] sm:h-[460px] md:h-[510px] rounded-lg p-6 flex flex-col items-center justify-between ${classes['glassEffect']}`}
			>
				<h2 className="text-xl text-center font-bold text-black mb-10">{product.name}</h2>

				<div className="w-[260px] sm:w-[300px] md:w-[350px] h-full flex justify-center items-center relative">
					{viewFormat === '2d' && <ProductImage imageData={product.imageData} name={product.name} />}
					{viewFormat === '3d' && product.modelData && <TShirtModel className="w-full h-full" src={product.modelData.url} />}

					{product.modelData && (
						<div className="absolute -right-1.5	md:right-0 -top-8">
							<CommonButton
								className="p-3"
								view={viewFormat === '2d' ? 'secondary' : 'primary'}
								onClick={onClickModelViewButton}
							>
								<span className="font-bold">{viewFormat === '2d' ? '3D' : '2D'}</span>
							</CommonButton>
						</div>
					)}
				</div>

				<div className="flex flex-col gap-2 items-center">
					<p className="text-center text-2xl font-bold text-gray-900">{product.price} ₽</p>

					<div className="grid grid-cols-2 gap-3 sm:gap-5">
						<Link href={`/${product.category}/${product.id}`}>
							<CommonButton className={`py-4 ${isMobile ? 'px-3' : 'px-6'}`} isStretched view="secondary">
								Подробнее
							</CommonButton>
						</Link>
						<CommonButton className={`py-4 ${isMobile ? 'px-3' : 'px-6'}`} onClick={() => setIsPurchaseOpen(true)}>
							Приобрести
						</CommonButton>
					</div>
				</div>
			</div>

			<Modal isOpen={isPurchaseOpen} title="Оформление заказа" onClose={() => setIsPurchaseOpen(false)}>
				<Purchase product={product} setIsOpen={setIsPurchaseOpen} />
			</Modal>
		</>
	);
}
