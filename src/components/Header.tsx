import Image from 'next/image';

export default function Header() {
	return (
		<header className="bg-white h-20 border-b-2 border-gray-300 flex items-center">
			<div className="w-4/5 mx-auto flex justify-between items-center">
				<Image src={'/text-logo.png'} width={130} height={29} alt="text-logo" />
			</div>
		</header>
	);
}
