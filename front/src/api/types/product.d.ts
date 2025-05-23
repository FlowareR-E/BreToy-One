export interface Product {
    id?: number;
    name: string;
    price: number;
    quantity: number;
    inStock: boolean;
    category?: string;
    lastUpdated?: string;
}
