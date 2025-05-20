import { FaFilter, FaSearch } from "react-icons/fa"
import { useEffect, useState } from "react"

export const SearchFilter = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const [animationClass, setAnimationClass] = useState("");

    const toggleExpand = () => {
        if (isExpanded) {
            setAnimationClass("animate-collapse");
            setTimeout(() => setShouldRender(false), 300); // match animation duration
        } else {
            setShouldRender(true);
            setAnimationClass("animate-expand");
        }
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="bg-gray-800 rounded-xl shadow-lg shadow-black/30 p-6">
            <div className="flex relative items-center gap-3">
                <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-gray-400"
                    placeholder="Search products..."
                />
                <div className="absolute right-0 flex space-x-2 mr-2">
                    <button
                        className="p-2 bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
                        onClick={toggleExpand}
                    >
                        <FaFilter />
                    </button>
                    <button
                        className="p-2 bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
                        aria-label="Search"
                    >
                        <FaSearch />
                    </button>
                </div>
            </div>

            {/* Filter Section */}
            {shouldRender && (
                <div className={`bg-gray-700 rounded-lg mt-2 ${animationClass}`}>
                    <div className="p-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Filter by Category
                            </label>
                            <select className="w-full p-2 rounded bg-gray-700 border border-gray-600">
                                <option value="">All Categories</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Availability
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="availability"
                                        value="in-stock"
                                        className="text-blue-500"
                                    />
                                    <span>In Stock</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
