import { useMemo, useState } from "react";
import { ProductServices } from "../api/productApi";
import type { InventoryMetrics, Product } from "../api/types/product";
import { filterProducts, type ProductFilter } from "../utils/filterUtils";

export const useProducts = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<ProductFilter>({});
    const [products, setProducts] = useState<Product[]>([]);
    const [metrics, setMetrics] = useState<InventoryMetrics | null>(null); 

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await ProductServices.getAll();
            setProducts(data);
            await fetchMetrics();
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : "API Error");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const filteredProducts = useMemo(() => {
        return filterProducts(products, filters);
    }, [products, filters]);

    const applyFilters = (newFilters : ProductFilter) => {
        setFilters(prev => ({...prev, ...newFilters}));
    }

    const clearFilters = () => {
        setFilters({});
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

    const toggleStock = async (id: number, inStock: boolean) => {
        try {
            setLoading(true);
            return await ProductServices.toggleStock(id ,inStock);
        } catch (err){
            setError(err instanceof Error ? err.message : "API Error");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const fetchMetrics = async () => {
        try {
            setLoading(true);
            const metrics = await ProductServices.getMetrics();
            setMetrics(metrics);
            return metrics;
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "API Error");
            throw err;
        }
        finally {
            setLoading(false);
        }
    }

    

    return {
        fetchProducts, 
        createProduct, 
        updateProduct,
        deleteProduct,
        fetchMetrics,
        toggleStock,
        applyFilters, 
        clearFilters,
        filteredProducts,
        products,
        metrics, 
        activeFilters : filters,
        loading, 
        error
    }
}