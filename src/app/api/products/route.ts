import {NextResponse, NextRequest} from 'next/server';
import productsData from '@/data/products.json';

import type {Product} from '@/types/product';

export const GET = (req: NextRequest) => {
	const {searchParams} = new URL(req.url);

	let products = [...productsData] as Product[];

	const category = searchParams.get('category');
	const minPrice = searchParams.get('minPrice');
	const maxPrice = searchParams.get('maxPrice');
	const sort = searchParams.get('sort');

	if (category) {
		products = products.filter((c) => c.category === category);
	}
	if (maxPrice) {
		products = products.filter((c) => c.price <= Number(maxPrice));
	}
	if (minPrice) {
		products = products.filter((c) => c.price >= Number(minPrice));
	}

	if (sort === 'asc') {
		products.sort((a, b) => a.price - b.price);
	} else if (sort === 'desc') {
		products.sort((a, b) => b.price - a.price);
	}

	return NextResponse.json(
		{
			items: products,
			total: products.length
		},
		{status: 200}
	);
};
