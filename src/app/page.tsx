'use client';
import {ProductCard, Slider} from '@/components';
import {BackgroundVideo} from '@/components/ui';

const sliderImages = [
	{src: '/slider/1.JPG', alt: 'Фото 1'},
	{src: '/slider/2.JPG', alt: 'Фото 2'},
	{src: '/slider/3.JPG', alt: 'Фото 3'},
	{src: '/slider/4.JPG', alt: 'Фото 4'},
	{src: '/slider/5.JPG', alt: 'Фото 5'},
	{src: '/slider/6.JPG', alt: 'Фото 6'}
];

export default function Home() {
	return (
		<div className="h-full flex flex-col justify-center">
			<Slider className="h-[65vh] lg:h-[70vh]" sliderImages={sliderImages} />
			<div className="relative h-[90vh] md:h-[80vh] flex flex-col justify-center">
				<div className="absolute top-0 bottom-0 left-0 right-0 z-0">
					<BackgroundVideo srcPath="video/background.mp4" source="mp4" restartDelay={5000} />
				</div>

				<div className="flex justify-center relative z-10">
					<ProductCard
						name="«DON'T STOP» T-SHIRT"
						price="3000"
						imageData={{urls: {back: '/hustlers-back-tshirt.png', front: '/hustlers-front-tshirt.png'}}}
						modelData={{url: '/models/hustlers-tshirt.meshopt.glb'}}
					/>
				</div>
			</div>
		</div>
	);
}
