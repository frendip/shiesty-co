import {BACKEND_URL} from './constants';
import type {Product} from '@/types/product';

interface ProductsFilter {
	category?: string;
	minPrice?: number;
	maxPrice?: number;
	sort?: 'asc' | 'desc';
}

interface ProductsResponse {
	items: Product[];
	total: number;
}

export async function getProducts(filters?: ProductsFilter): Promise<ProductsResponse> {
	const url = new URL('/api/products', BACKEND_URL);

	if (filters) {
		Object.entries(filters).forEach(([filter, value]) => {
			if (value !== undefined && value !== null) {
				url.searchParams.append(filter, String(value));
			}
		});
	}

	const res = await fetch(url, {next: {revalidate: 21600}});

	if (!res.ok) {
		throw Error(`Failed to fetch products: ${res.statusText}`);
	}

	return res.json();
}

interface ProductResponse {
	item: Product;
}

export async function getProductById(id: string): Promise<ProductResponse> {
	const url = new URL(`/api/products/${id}`, BACKEND_URL);

	const res = await fetch(url, {next: {revalidate: 21600}});

	if (!res.ok) {
		throw Error(`Failed to fetch product: ${res.statusText}`);
	}

	return res.json();
}
