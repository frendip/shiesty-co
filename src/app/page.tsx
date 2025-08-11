import {ProductCard} from '@/components';
import {BackgroundVideo} from '@/components/ui';

export default function Home() {
	return (
		<div className="relative py-6 h-full flex flex-col justify-center">
			<div className="absolute top-0 bottom-0 left-0 right-0 z-0">
				<BackgroundVideo srcPath="/background.mp4" source="mp4" restartDelay={5000} />
			</div>

			<div className="flex justify-center relative z-10">
				<ProductCard name="«DON'T STOP» T-SHIRT" price="3000" />
			</div>
		</div>
	);
}
