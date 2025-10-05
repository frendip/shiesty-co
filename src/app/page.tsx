import {ProductCard, Slider} from '@/components';
import {BackgroundVideo} from '@/components/ui';
import {getProducts} from '@/lib/api';

const sliderImages = [
	{src: '/slider/1.JPG', alt: 'Фото 1'},
	{src: '/slider/2.JPG', alt: 'Фото 2'},
	{src: '/slider/3.JPG', alt: 'Фото 3'},
	{src: '/slider/4.JPG', alt: 'Фото 4'},
	{src: '/slider/5.JPG', alt: 'Фото 5'},
	{src: '/slider/6.JPG', alt: 'Фото 6'}
];

export default async function Home() {
	const products = await getProducts();

	return (
		<div className="h-full">
			<div className="font-druk-wide text-center text-4xl md:text-7xl my-3 md:my-4">
				“INSPIRED BY THE FEAR OF BEING AVERAGE”
			</div>

			<Slider className="h-[70vh]" sliderImages={sliderImages} />

			<div className="mt-3 mb-15 md:mt-30 md:mb-30 flex flex-col justify-center items-center gap-3 md:relative">
				<div className="w-1/2 md:w-full md:absolute md:inset-0">
					<BackgroundVideo srcPath="video/background.mp4" source="mp4" restartDelay={5000} />
				</div>

				<div className="flex justify-center flex-wrap gap-12">
					{products.items.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</div>
	);
}
