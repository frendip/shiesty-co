import 'normalize.css';
import './globals.css';
import type {Metadata} from 'next';
import {Header, Footer} from '@/components';

export const metadata: Metadata = {
	title: 'Clothes Shop - Интернет-магазин одежды',
	description: 'Современный интернет-магазин стильной одежды. Качественные товары по доступным ценам.',
	keywords: 'одежда, магазин, футболки, стиль, мода',
	authors: [{name: 'Clothes Shop'}],
	viewport: 'width=device-width, initial-scale=1'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body className="antialiased bg-gray-50">
				<div className="h-screen flex flex-col">
					<Header />
					<main className="flex-1">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
