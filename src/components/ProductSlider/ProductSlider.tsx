'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import LoaderIcon from '@/assets/loader.svg';

const DynamicProductSlider = dynamic(() => import('./DynamicProductSlider'), {
	ssr: false,
	loading: () => {
		return (
			<div className="flex justify-center items-center w-full h-full">
				<LoaderIcon width="25%" height="25%" />
			</div>
		);
	}
});

export type SliderImages = {src: string; alt: string}[];

export interface SliderProps {
	className?: string;
	sliderImages: SliderImages;
}

export default function ProductSlider(props: SliderProps) {
	return (
		<div className={props.className}>
			<DynamicProductSlider {...props} />
		</div>
	);
}
