import { FaFilter, FaSearch } from "react-icons/fa"
import { useState } from "react"

export const SearchFilter = () => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = ()=> {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className="bg-gray-800 rounded-xl shadow-lg shadow-black/30 p-6">
        <div className="flex gap-3">
        <input
            type="text"
            className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-gray-400"
            placeholder="Search products..."
        />
        <button 
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            disabled
        >
            <FaSearch />
            SEARCH
        </button>
        <button 
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2 disabled:opacity-50"
            onClick={toggleExpand}
        >
            <FaFilter />
            FILTER
        </button>
        </div>
        {/* Filter Section */}

        {isExpanded && (
            <div className="bg-gray-700 rounded-lg p-4 mt-2 space-y-4">

            </div>
        )}
    </div>
  )
}
