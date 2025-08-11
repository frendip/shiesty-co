import React from 'react';
import {LinkButton} from '@/components/ui';
import TelegramIcon from '@/assets/telegram.svg';
import InstagramIcon from '@/assets/instagram.svg';
import YoutubeIcon from '@/assets/youtube.svg';

function Contacts() {
	return (
		<div className="flex flex-col gap-3 text-black">
			<LinkButton href="https://t.me/shiestyco" label="@shiestyco" Icon={TelegramIcon} />
			<LinkButton href="https://www.instagram.com/shiesty.company" label="@shiesty.company" Icon={InstagramIcon} />
			<LinkButton href="https://www.youtube.com/@shiesty.company" label="@shiesty.company" Icon={YoutubeIcon} />
		</div>
	);
}

export default Contacts;
