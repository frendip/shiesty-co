import React from 'react';
import {LinkButton} from '@/components/ui/buttons';
import TelegramIcon from '@/assets/telegram.svg';
import InstagramIcon from '@/assets/instagram.svg';

function Contacts() {
	return (
		<div className="flex flex-col gap-3 text-black">
			<LinkButton href="https://t.me/shiestycompany" label="@shiestycompany" Icon={TelegramIcon} />
			<LinkButton href="https://www.instagram.com/shiesty.company" label="@shiesty.company" Icon={InstagramIcon} />
		</div>
	);
}

export default Contacts;
