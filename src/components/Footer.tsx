'use client';

import {LinkButton} from '@/components/ui/buttons';
import TelegramIcon from '@/assets/telegram.svg';
import InstagramIcon from '@/assets/instagram.svg';

interface FooterProps {
	className?: string;
}

export default function Footer({className = ''}: FooterProps) {
	return (
		<footer className={`p-2 md:p-4 bg-black text-white ${className}`}>
			<div className="w-4/5 mx-auto flex justify-center md:justify-between text-sm md:text-base">
				<div className="flex gap-4 md:gap-10">
					<LinkButton href="https://t.me/shiestycompany" label="@shiestycompany" Icon={TelegramIcon} />
					<LinkButton href="https://www.instagram.com/shiesty.company" label="@shiesty.company" Icon={InstagramIcon} />
				</div>
			</div>
		</footer>
	);
}
