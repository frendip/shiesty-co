'use client';

import React, {useState, useRef} from 'react';
import Image from 'next/image';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Thumbs, Keyboard} from 'swiper/modules';
import type {Swiper as SwiperType} from 'swiper';
import 'swiper/css';
import 'swiper/css/thumbs';
import type {SliderProps} from './ProductSlider';

import classes from './ProductSlider.module.css';

interface ZoomableImageProps {
	src: string;
	alt: string;
}

function ZoomableImage({src, alt}: ZoomableImageProps) {
	const imageRef = useRef<HTMLDivElement>(null);
	const [isZoomed, setIsZoomed] = useState(false);
	const [zoomPosition, setZoomPosition] = useState({x: 50, y: 50});

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!imageRef.current) return;

		const rect = imageRef.current.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width) * 100;
		const y = ((e.clientY - rect.top) / rect.height) * 100;

		setZoomPosition({x, y});
	};

	const handleMouseEnter = () => {
		setIsZoomed(true);
	};

	const handleMouseLeave = () => {
		setIsZoomed(false);
		setZoomPosition({x: 50, y: 50});
	};

	return (
		<div
			ref={imageRef}
			className="relative w-full h-full cursor-zoom-in overflow-hidden"
			onMouseMove={handleMouseMove}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<Image
				src={src}
				alt={alt}
				fill
				className="object-contain transition-transform duration-200 ease-out"
				style={{
					transform: isZoomed ? 'scale(2)' : 'scale(1)',
					transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
				}}
			/>
		</div>
	);
}

export default function DynamicProductSlider({sliderImages}: SliderProps) {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

	return (
		<div className={`w-full h-full flex flex-col gap-6`}>
			<Swiper
				modules={[Thumbs, Keyboard]}
				thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
				keyboard={{
					enabled: true,
					onlyInViewport: true
				}}
				loop={true}
				className={`${classes.slider} w-full h-5/6`}
			>
				{sliderImages.map((image, index) => (
					<SwiperSlide key={index}>
						{/* <Image src={image.src} alt={image.alt} fill className="object-contain" /> */}
						<ZoomableImage src={image.src} alt={image.alt} />
					</SwiperSlide>
				))}
			</Swiper>

			<Swiper
				onSwiper={setThumbsSwiper}
				modules={[Thumbs]}
				spaceBetween={5}
				slidesPerView={sliderImages.length}
				watchSlidesProgress={true}
				className={`${classes.slider} mx-auto w-3/5 h-1/6`}
			>
				{sliderImages.map((image, index) => (
					<SwiperSlide
						key={index}
						className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity border-2 border-transparent hover:border-gray-300 rounded-lg overflow-hidden"
					>
						<Image src={image.src} alt={image.alt} fill className="object-contain" />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
