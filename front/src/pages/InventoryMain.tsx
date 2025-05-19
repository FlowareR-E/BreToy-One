import { FaBoxes } from "react-icons/fa";
import { SearchFilter } from "../components/SearchFilter";


export const InventoryMain = ()=> {
  return (
    <div className="min-h-screen text-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4 p-4 bg-gray-800 rounded-full">
            <FaBoxes className="text-4xl text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-300 to-purple-800 bg-clip-text text-transparent">
            Inventory Management System
          </h1>
        </div>

          {/* Body */}
        <div className="space-y-8">
          {/* Search Section */}
          <SearchFilter/>

          {/* Table Section */}
          <div className="bg-gray-800 rounded-xl shadow-lg shadow-black/30 overflow-hidden">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-700 rounded-t-lg"></div>

            </div>
            <div className="p-4 text-center text-gray-500">
              Inventory data will appear here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
