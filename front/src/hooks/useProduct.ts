import { useState } from "react";
import { ProductServices } from "../api/productApi";
import type { Product } from "../api/types/product";

export const useProducts = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            return await ProductServices.getAll();
        } catch (err) {
            setError(err instanceof Error ? err.message : "API Error");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const createProduct = async (product: Omit<Product, "id">) => {
        try{
            setLoading(true);
            return await ProductServices.create(product);
        } catch (err){
            setError(err instanceof Error ? err.message : "API Error");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const updateProduct= async (id: number, product: Omit<Product, "id">) => {
        try{
            setLoading(true);
            return await ProductServices.update(id, product);
        } catch (err){
            setError(err instanceof Error ? err.message : "API Error");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const deleteProduct = async (id: number) => {
        try{
            setLoading(true);
            return await ProductServices.delete(id);
        } catch (err){
            setError(err instanceof Error ? err.message : "API Error");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return {
        fetchProducts, 
        createProduct, 
        updateProduct,
        deleteProduct,
        loading, 
        error
    }
}