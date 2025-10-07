import {NextRequest, NextResponse} from 'next/server';
import productsData from '@/data/products.json';

type Ctx = {params: Promise<{id: string}>};

export const GET = async (req: NextRequest, {params}: Ctx) => {
	const {id} = await params;
	const product = productsData.find((product) => product.id === id);

	if (!product) {
		return NextResponse.json({error: id}, {status: 404});
	}

	return NextResponse.json(
		{
			item: product
		},
		{status: 200}
	);
};
