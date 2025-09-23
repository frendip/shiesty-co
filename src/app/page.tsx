import {ProductCard} from '@/components';
import {BackgroundVideo} from '@/components/ui';

export default function Home() {
	return (
		<div className="relative h-full flex flex-col justify-center">
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
	);
}
