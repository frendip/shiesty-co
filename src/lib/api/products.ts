import productsData from '@/data/products.json';
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

export async function getProducts(filters: ProductsFilter = {}): Promise<ProductsResponse> {
	let products = [...productsData] as Product[];

	if (filters.category) {
		products = products.filter((product) => product.category === filters.category);
	}
	if (filters.maxPrice !== undefined) {
		products = products.filter((product) => product.price <= filters.maxPrice!);
	}
	if (filters.minPrice !== undefined) {
		products = products.filter((product) => product.price >= filters.minPrice!);
	}
	if (filters.sort === 'asc') {
		products.sort((a, b) => a.price - b.price);
	} else if (filters.sort === 'desc') {
		products.sort((a, b) => b.price - a.price);
	}

	return {items: products, total: products.length};
}

interface ProductResponse {
	item: Product;
}

export async function getProductById(id: string): Promise<ProductResponse | undefined> {
	const product = (productsData as Product[]).find((product) => product.id === id);
	return product ? {item: product} : undefined;
}
