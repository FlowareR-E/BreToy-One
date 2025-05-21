import apiClient from "./axiosConfig";
import type { Product } from "./types/product";

export const ProductServices = {

    async getAll(): Promise<Product[]> {
        return apiClient.get('/products');
    },

    async create(product: Omit<Product, "id">): Promise<Product> {
        return apiClient.post("/products", product);
    },

    async update(id: number, product: Omit<Product, "id">): Promise<Product> {
        return apiClient.put(`/products/${id}`, product);
    },

    async delete(id: number): Promise<void>{
        return apiClient.delete(`/products/${id}`);
    }
}

