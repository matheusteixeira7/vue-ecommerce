export interface ProductInterface {
    id: string;
    category: string;
    subcategory: string;
    name: string;
    price: number;
    rating: number;
    images: {
        id: string;
        name: string;
        src: string;
        alt: string;
    }[];
    colors: {
        name: string;
        bgColor: string;
        selectedColor: string;
    }[];
    description: string;
    details: {
        name: string;
        items: string[];
    }[];
    size?: string;
}
