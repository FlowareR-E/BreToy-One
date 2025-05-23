import { FaFilter } from "react-icons/fa"
import { useEffect, useState } from "react"
import type { ProductFilter } from "../utils/filterUtils";

interface SearchFilterProps {
    onFilterChange: (filters: ProductFilter) => void
    categories: string[];
}

export const SearchFilter = ({ onFilterChange, categories }: SearchFilterProps) => {
    const [localFilters, setLocalFilters] = useState<ProductFilter>({});
    const [isExpanded, setIsExpanded] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const [animationClass, setAnimationClass] = useState("");

    const toggleExpand = () => {
        if (isExpanded) {
            setAnimationClass("animate-collapse");
            setTimeout(() => setShouldRender(false), 300);
        } else {
            setShouldRender(true);
            setAnimationClass("animate-expand");
        }
        setIsExpanded(!isExpanded);
    };

    const handleCategoryToggle = (category: string) => {
        setLocalFilters(prev => {
            const currentCategories = prev.categories || [];
            const newCategories = currentCategories.includes(category)
                ? currentCategories.filter(c => c !== category)
                : [...currentCategories, category]

            return {
                ...prev, categories: newCategories.length > 0 ? newCategories : undefined
            };
        })
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            onFilterChange(localFilters)

        }, 300);
        return () => clearTimeout(timer);
    }, [localFilters, onFilterChange])

    return (
        <div className="bg-gray-800 rounded-xl shadow-lg shadow-black/30 p-6 min-h-auto">
            <div className="flex relative items-center gap-3">
                <input
                    type="text"
                    value={localFilters.name}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-gray-400"
                    placeholder="Search products..."
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, name: e.target.value }))}
                />
                <div className="absolute right-0 flex space-x-2 mr-2">
                    <button
                        className="p-2 bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
                        onClick={toggleExpand}
                    >
                        <FaFilter />
                    </button>
                </div>
            </div>

            {/* Filter Section */}
            {shouldRender && (
                <div className={`mt-4 ${animationClass} flex flex-col md:flex-row gap-3 justify-around`}>

                    <div className="bg-gray-700 rounded-lg p-4 w-full md:w-1/4">
                        <label className="block text-sm font-medium mb-2">
                            Availability
                        </label>
                        <div className="flex flex-col gap-2 justify-center ">
                            <label className="items-center space-x-2">
                                <input
                                    type="radio"
                                    name="availability"
                                    className="text-blue-500"
                                    checked={localFilters.inStock === undefined}
                                    onChange={() => setLocalFilters((prev => ({ ...prev, inStock: undefined })))}
                                />
                                <span>All</span>

                            </label>
                            <label className="items-center space-x-2">
                                <input
                                    type="radio"
                                    name="availability"
                                    className="text-blue-500"
                                    checked={localFilters.inStock === true}
                                    onChange={() => setLocalFilters((prev => ({ ...prev, inStock: true })))}
                                />
                                <span>In Stock</span>

                            </label>
                            <label className="items-center text-nowrap space-x-2">
                                <input
                                    type="radio"
                                    name="availability"
                                    className="text-blue-500"
                                    checked={localFilters.inStock === false}
                                    onChange={() => setLocalFilters((prev => ({ ...prev, inStock: false })))}
                                />
                                <span>Out of Stock</span>

                            </label>
                        </div>
                    </div>


                    <div className="bg-gray-700 rounded-lg p-4 w-full md:w-1/2 flex-1 md:max-h-[70vh] md:overflow-y-auto">
                        <h3 className="block text-sm font-medium mb-2 "> Filter by Category</h3>
                        <div className="h-auto pr-2 flex  flex-wrap gap-5">

                            {categories.map((category) => (
                                <label key={category} className="flex items-center space-x-2 justify-center">
                                    <input
                                        type="checkbox"
                                        checked={localFilters.categories?.includes(category) || false}
                                        onChange={() => {
                                            handleCategoryToggle(category);
                                        }}
                                        className="text-blue-500 rounded"
                                    />
                                    <span>{category}</span>
                                </label>
                            ))}
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};
