import 'normalize.css';
import './globals.css';
import type {Metadata} from 'next';
import {Header, Footer} from '@/components';

export const metadata: Metadata = {
	title: 'Shiesty Company',
	description:
		'Shiesty Company — бренд, цель которого объединять и вдохновлять молодых людей, стремящихся к развитию и успеху.',
	keywords: 'стритвир, уличная одежда, футболки, бренд одежды',
	authors: [{name: 'Shiesty Company'}],
	viewport: 'width=device-width, initial-scale=1'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body className="antialiased bg-white">
				<div className="h-screen flex flex-col">
					<Header className="shrink-0" />
					<main className="flex-1 p-8">{children}</main>
					<Footer className="shrink-0" />
				</div>
			</body>
		</html>
	);
}
