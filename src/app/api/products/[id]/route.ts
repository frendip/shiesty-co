import {NextRequest, NextResponse} from 'next/server';
import {getProductById} from '@/lib/api';

type Ctx = {params: Promise<{id: string}>};

export const GET = async (req: NextRequest, {params}: Ctx) => {
	const {id} = await params;
	const product = await getProductById(id);

	if (!product) {
		return NextResponse.json({error: id}, {status: 404});
	}

	return NextResponse.json(product, {status: 200});
};
