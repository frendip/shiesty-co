'use client';

import {Modal} from '@/components/ui';
import {useState} from 'react';
import {Contacts, AboutUs} from '@/components';

interface FooterProps {
	className?: string;
}

export default function Footer({className = ''}: FooterProps) {
	const [isContact, setIsContact] = useState(false);
	const [isAboutUs, setIsAboutUs] = useState(false);
	return (
		<footer className={`p-2 md:p-4 bg-black text-white ${className}`}>
			<div className="w-4/5 mx-auto flex justify-center md:justify-between text-lg md:text-base">
				<div className="flex gap-10">
					<button onClick={() => setIsContact(true)} className="p-4 md:p-2 text-white hover:text-gray-300 transition-colors">
						Контакты
					</button>
					<button onClick={() => setIsAboutUs(true)} className="p-4 md:p-2 text-white hover:text-gray-300 transition-colors">
						О нас
					</button>

					<Modal isOpen={isContact} title="Контакты" onClose={() => setIsContact(false)}>
						<Contacts />
					</Modal>

					<Modal isOpen={isAboutUs} title="О нас" onClose={() => setIsAboutUs(false)}>
						<AboutUs />
					</Modal>
				</div>
			</div>
		</footer>
	);
}
