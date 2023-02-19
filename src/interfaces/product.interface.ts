export interface ProductInterface {
    id: string;
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
