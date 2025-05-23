import type { Product } from "../api/types/product"

export interface ProductFilter {
    name?: string,
    categories? : string[], 
    inStock? : boolean
}

export const filterProducts = (
    products : Product[],
    filters : ProductFilter
) : Product[] =>{
    return products.filter(product => {
        if(filters.name && !product.name.toLowerCase().includes(filters.name.toLowerCase())){
            return false;
        }

        if(filters.categories && filters.categories.length > 0){
            if(!product.category || !filters.categories.includes(product.category)) 
                return false;
        }

        if(filters.inStock !== undefined && product.inStock !== filters.inStock){
            return false;
        }

        return true;
    });
    
}