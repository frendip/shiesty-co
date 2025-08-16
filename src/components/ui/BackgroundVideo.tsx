'use client';

import {useRef, useEffect} from 'react';

interface BackgroundVideoProps {
	srcPath: string;
	source: 'mp4';
	restartDelay?: number;
}

export default function BackgroundVideo({srcPath, source, restartDelay = 0}: BackgroundVideoProps) {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleVideoEnd = () => {
			video.currentTime = 0;

			if (restartDelay > 0) {
				setTimeout(() => {
					video.play();
				}, restartDelay);
			} else {
				video.play();
			}
		};

		video.addEventListener('ended', handleVideoEnd);

		return () => {
			video.removeEventListener('ended', handleVideoEnd);
		};
	}, [restartDelay]);

	return (
		<video
			ref={videoRef}
			className="w-full h-full object-contain lg:object-cover"
			playsInline
			disablePictureInPicture
			disableRemotePlayback
			muted
			autoPlay
			preload="auto"
		>
			<source src={srcPath} type={`video/${source}`} />
		</video>
	);
}
