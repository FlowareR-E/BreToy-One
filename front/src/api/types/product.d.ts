export interface Product {
    id?: number;
    name: string;
    price: number;
    quantity: number;
    category?: string;
    updateDate?: string;
    creationDate?: string;
}

export interface InventoryMetrics {
  totalProductsInStock: number;
  totalProductsOutOfStock: number;
  totalProducts: number;
  totalInventoryValue: number;
  averagePrice: number;
  metricsByCategory: {
    category: string;
    totalProductsInStock: number;
    totalInventoryValue: number;
    averagePrice: number;
  }[];
}