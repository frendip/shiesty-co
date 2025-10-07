export interface ImageData {
	urls: {
		back: string;
		front: string;
		sizeGrid: string;
	};
}

export interface ModelData {
	url: string;
}

export type Categories = 'shirts';

export interface Product {
	id: string;
	category: Categories;
	name: string;
	sizes: string[];
	price: number;
	material?: string,
	color?: string,
	fit?: string,
	careInstructions?: string,
	imageData: ImageData;
	modelData?: ModelData;
}
