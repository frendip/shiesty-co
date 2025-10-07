import {NextRequest, NextResponse} from 'next/server';
import productsData from '@/data/products.json';

type Ctx = {params: {id: string}};

export const GET = (req: NextRequest, {params}: Ctx) => {
	const {id} = params;
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
