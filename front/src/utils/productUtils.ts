import type { Product } from "../api/types/product"

export const getCategories = (products : Product[]) : string[] => {
    const categories = products.map(p => p.category).filter((category): category is string => Boolean(category));
    return [...new Set(categories)];
}