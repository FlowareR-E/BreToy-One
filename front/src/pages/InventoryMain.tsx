import { FaBoxes } from "react-icons/fa";
import { SearchFilter } from "../components/SearchFilter";
import { ProductTable } from "../components/ProductTable";
import { useState } from "react";
import type { ProductFilter } from "../utils/filterUtils";
import { getCategories } from "../utils/productUtils";
import type { Product } from "../api/types/product";
import { MetricChart } from "../components/MetricChart";


export const InventoryMain = () => {
  const [activeFilters, setActiveFilters] = useState<ProductFilter>({});
  const [categories, setCategories] = useState<string[]>([]);

  const handleProductsLoaded = (products: Product[]) => {
    setCategories(getCategories(products));
  }

  return (
    <div className="min-h-screen text-gray-100 mt-10 sm:mt-5 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12 flex justify-center gap-4 items-center">
          <div className="inline-flex items-center justify-center p-4 bg-gray-800 rounded-full">
            <FaBoxes className="md:text-4xl text-2xl text-indigo-400" />
          </div>
          <h1 className="md:text-4xl font-bold text-gray-100 bg-clip-text text-2xl">
            Inventory System
          </h1>
        </div>

        {/* Body */}
        <div className="max-w-4xl mx-auto ">

          {/* Search Section */}
          <SearchFilter
            onFilterChange={setActiveFilters}
            categories={categories}
          />

          {/* Table Section */}
          <div className="bg-gray-800 rounded-xl shadow-lg  mt-5 shadow-black/30 overflow-hidden">
            <div className="p-4 text-center text-gray-500">
              <ProductTable
                activeFilters={activeFilters}
                onProductsLoaded={handleProductsLoaded}
              />
            </div>
          </div>

          {/* Metrics Section */}
          <div>
            <MetricChart/>
          </div>
        </div>
      </div>
    </div>
  );
}
