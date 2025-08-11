'use client';

import {Modal} from '@/components/ui';
import {useState} from 'react';
import {Contacts, AboutUs} from '@/components';

export default function Footer() {
	const [isContact, setIsContact] = useState(false);
	const [isAboutUs, setIsAboutUs] = useState(false);
	return (
		<footer className="bg-black text-white p-4">
			<div className="w-4/5 mx-auto flex justify-between">
				<div className="flex gap-10">
					<button onClick={() => setIsContact(true)} className="text-white p-2 hover:text-gray-300 transition-colors">
						Контакты
					</button>
					<button onClick={() => setIsAboutUs(true)} className="text-white p-2 hover:text-gray-300 transition-colors">
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
