export interface ImageData {
	urls: {
		back: string;
		front: string;
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
	imageData: ImageData;
	modelData?: ModelData;
}
