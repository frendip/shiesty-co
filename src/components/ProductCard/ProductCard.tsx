'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import {useGLTF, useEnvironment} from '@react-three/drei';
import {useState, useEffect} from 'react';
import {CommonButton, SelectorButton} from '@/components/ui/buttons';
import {Modal} from '@/components/ui';
import LoaderIcon from '@/assets/loader.svg';
import Purchase from './Purchase';
import classes from './ProductCard.module.css';

const TShirtModel = dynamic(() => import('@/components/TShirtModel'), {
	ssr: false,
	loading: () => <LoaderIcon width="116" height="116" />
});

type ImageData = {urls: {back: string; front: string}};
type ModelData = {url: string};

interface ProductCardProps {
	name: string;
	price: string;
	imageData: ImageData;
	modelData?: ModelData;
}

function ProductImage({imageData, name}: {imageData: ImageData; name: string}) {
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
		<Image
			src={isHovered ? imageData.urls.front : imageData.urls.back}
			width={350}
			height={272.5}
			alt={name}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleClick}
		/>
	);
}

export default function ProductCard({name, price, imageData, modelData}: ProductCardProps) {
	const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
	const [viewFormat, setViewFormat] = useState<'2d' | '3d'>('2d');

	const onClickModelViewButton = () => {
		setViewFormat((prevView) => (prevView === '2d' ? '3d' : '2d'));
	};

	useEffect(() => {
		if (modelData?.url) {
			useGLTF.preload(modelData.url);
			useEnvironment.preload({preset: 'warehouse'});
		}
	}, [modelData?.url]);

	return (
		<>
			<div className={`h-[450px] md:h-[500px] rounded-lg p-6 flex flex-col justify-between ${classes['glassEffect']}`}>
				<h2 className="text-xl text-center font-semibold text-gray-900 mb-4">{name}</h2>

				{modelData && (
					<div className="flex self-end">
						<SelectorButton onClick={onClickModelViewButton}>{viewFormat === '2d' ? '3D' : '2D'}</SelectorButton>
					</div>
				)}

				<div className="h-[222.5px] md:h-[272.5px] w-[300px] md:w-[350px] flex justify-center items-center relative">
					{viewFormat === '2d' && <ProductImage imageData={imageData} name={name} />}
					{viewFormat === '3d' && modelData && <TShirtModel className="w-full h-full" src={modelData.url} />}
				</div>

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
