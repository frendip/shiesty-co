import {NextResponse, NextRequest} from 'next/server';
import {getProducts} from '@/lib/api';

export const GET = async (req: NextRequest) => {
	const {searchParams} = new URL(req.url);
	const minPrice = searchParams.get('minPrice');
	const maxPrice = searchParams.get('maxPrice');
	const sort = searchParams.get('sort');

	const products = await getProducts({
		category: searchParams.get('category') || undefined,
		minPrice: minPrice ? Number(minPrice) : undefined,
		maxPrice: maxPrice ? Number(maxPrice) : undefined,
		sort: sort === 'asc' || sort === 'desc' ? sort : undefined
	});

	return NextResponse.json(products, {status: 200});
};
