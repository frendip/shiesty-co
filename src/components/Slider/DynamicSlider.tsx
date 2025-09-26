'use client';

import React from 'react';
import Image from 'next/image';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import classes from './Slider.module.css';

import {SliderProps} from './Slider';

export default function DynamicSlider({sliderImages}: SliderProps) {
	return (
		<Swiper
			modules={[Pagination, Autoplay]}
			spaceBetween={20}
			slidesPerView={1}
			centeredSlides
			pagination={{
				clickable: true,
				type: 'bullets'
			}}
			autoplay={{
				delay: 3000,
				disableOnInteraction: false
			}}
			loop={true}
			breakpoints={{
				640: {
					slidesPerView: 2,
					spaceBetween: 10
				},
				1024: {
					slidesPerView: 3,
					spaceBetween: 30
				}
			}}
			className={`${classes.verticalPhotosSlider} relative w-full h-full`}
		>
			{sliderImages.map((image, index) => (
				<SwiperSlide key={index}>
					<Image src={image.src} alt={image.alt} fill className="object-cover" />
				</SwiperSlide>
			))}
		</Swiper>
	);
}
