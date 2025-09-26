'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import LoaderIcon from '@/assets/loader.svg';

const DynamicSlider = dynamic(() => import('./DynamicSlider'), {
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

export default function Slider(props: SliderProps) {
	return (
		<div className={props.className}>
			<DynamicSlider {...props} />
		</div>
	);
}
