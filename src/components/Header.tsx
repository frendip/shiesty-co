import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
	className?: string;
}

export default function Header({className = ''}: HeaderProps) {
	return (
		<header className={`h-16 md:h-20 flex items-center bg-white border-b-2 border-gray-300 ${className}`}>
			<div className="w-4/5 mx-auto flex justify-center md:justify-between items-center">
				<Link href={'/'}>
					<Image priority src={'/text-logo.png'} width={130} height={29} alt="text-logo" />
				</Link>
			</div>
		</header>
	);
}
