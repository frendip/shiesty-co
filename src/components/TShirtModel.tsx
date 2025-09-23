'use client';

import {Suspense, useState, useRef} from 'react';
import {Canvas} from '@react-three/fiber';
import {useGLTF, OrbitControls, Center, Environment, useProgress} from '@react-three/drei';
import LoaderIcon from '@/assets/loader.svg';

type Props = {
	src: string;
	className?: string;
};

function ModelLoader() {
	const {progress, loaded, total, active} = useProgress();

	if (!active) return null;

	return (
		<div className="absolute inset-0 flex items-center justify-center">
			<div className="flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-lg">
				<div className="mb-4">
					<LoaderIcon width="32" height="32" />
				</div>

				<div className="text-gray-700 font-medium mb-3">Загрузка 3D модели</div>

				<div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
					<div
						className="h-full bg-gradient-to-r from-black to-gray-700 rounded-full transition-all duration-300 ease-out"
						style={{width: `${progress}%`}}
					></div>
				</div>

				<div className="text-sm text-gray-600">
					{Math.round(progress)}% ({loaded} из {total})
				</div>
			</div>
		</div>
	);
}

function Model({src}: {src: string}) {
	const {scene} = useGLTF(src);

	return <primitive object={scene} />;
}

const RESUME_DELAY = 1500;

export default function TShirtModel({className, src}: Props) {
	const [autoRotate, setAutoRotate] = useState(true);
	const resumeTimer = useRef<number | null>(null);

	const cancelTimer = () => {
		if (resumeTimer.current !== null) {
			clearTimeout(resumeTimer.current);
			resumeTimer.current = null;
		}
	};

	const handlerStart = () => {
		cancelTimer();
		setAutoRotate(false);
	};

	const handlerEnd = () => {
		resumeTimer.current = window.setTimeout(() => {
			setAutoRotate(true);
			resumeTimer.current = null;
		}, RESUME_DELAY);
	};

	return (
		<div className={`${className} relative`}>
			<ModelLoader />
			<Canvas camera={{position: [0, 0, 3.7], fov: 30}}>
				<Suspense fallback={null}>
					<Environment preset="warehouse" />

					<Center>
						<Model src={src} />
					</Center>

					<OrbitControls
						makeDefault
						enableZoom={false}
						enablePan={false}
						autoRotate={autoRotate}
						autoRotateSpeed={2.5}
						minPolarAngle={Math.PI / 2}
						maxPolarAngle={Math.PI / 2}
						onStart={handlerStart}
						onEnd={handlerEnd}
					/>
				</Suspense>
			</Canvas>
		</div>
	);
}
