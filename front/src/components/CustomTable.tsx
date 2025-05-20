import { FaChevronLeft, FaChevronRight, FaEdit, FaTrash } from "react-icons/fa";

export const CustomTable = () => {
	const mockData = Array(10).fill({
		id: "1",
		name: "testname",
		category: "Testcategory",
		stock: 25,
		price: 99.99,
		status: "Out of Stock",
		lastUpdated: "2025-05-15"
	});

	return (
		<div className="bg-gray-800 rounded-xl shadow-lg shadow-black/30 overflow-hidden">

			{/* Desktop Header */}
			<div className="hidden md:block">
				<div className="grid grid-cols-12 bg-gray-700 p-4 rounded-t-lg items-center">
					<div className="col-span-1 font-medium">ID</div>
					<div className="col-span-3 font-medium">Name</div>
					<div className="col-span-2 font-medium">Category</div>
					<div className="col-span-1 font-medium text-center">Stock</div>
					<div className="col-span-2 font-medium text-center">Price</div>
					<div className="col-span-2 font-medium text-center">Status</div>
					<div className="col-span-1 font-medium text-center">Actions</div>
				</div>

				{/* Desktop Body */}
				<div className="divide-y divide-gray-700">
					{mockData.map((item, index) => (
						<div
							key={index}
							className="grid grid-cols-12 p-4 items-center hover:bg-gray-750 transition-colors"
						>
							<div className="col-span-1 text-indigo-400 font-mono">{item.id}</div>
							<div className="col-span-3 truncate">{item.name}</div>
							<div className="col-span-2 text-gray-400">{item.category}</div>
							<div className="col-span-1 text-center">{item.stock}</div>
							<div className="col-span-2 text-center">${item.price.toFixed(2)}</div>
							<div className="col-span-2 text-center">
								<span className={`px-2 py-1 rounded-full text-xs ${item.status === "In Stock" ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}
								> {item.status}
								</span>
							</div>
							<div className="col-span-1 flex justify-center space-x-2">
								<button className="p-1 text-gray-400 hover:text-indigo-400 transition-colors">
									<FaEdit />
								</button>
								<button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
									<FaTrash />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Mobile Cards */}
			<div className="md:hidden">
				{mockData.map((item, index) => (
					<div key={index} className="p-4 border-b border-gray-700">
						<div className="flex justify-between items-start mb-2">
							<div className="text-indigo-400 font-mono">ID: {item.id}</div>
							<span className={`px-2 py-1 rounded-full text-xs ${item.status === "In Stock"
									? "bg-green-900 text-green-300"
									: "bg-red-900 text-red-300"
								}`}>
								{item.status}
							</span>
						</div>
						<div className="text-lg font-medium mb-1">{item.name}</div>
						<div className="text-gray-400 text-sm mb-2">{item.category}</div>

						<div className="grid grid-cols-2 gap-2 text-sm mt-3">
							<div>
								<div className="text-gray-500">Stock</div>
								<div>{item.stock}</div>
							</div>
							<div>
								<div className="text-gray-500">Price</div>
								<div>${item.price.toFixed(2)}</div>
							</div>
						</div>

						<div className="flex justify-end space-x-3 mt-3">
							<button className="flex items-center text-sm text-indigo-400">
								<FaEdit className="mr-1" /> Edit
							</button>
							<button className="flex items-center text-sm text-red-400">
								<FaTrash className="mr-1" /> Delete
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Desktop Pagination */}
			<div className="hidden md:flex items-center justify-between p-4 bg-gray-800 border-t border-gray-700">
				<div className="text-sm text-gray-400">
					Showing 1 to 10 of 100 items
				</div>
				<div className="flex space-x-2">
					<button className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
						<FaChevronLeft />
					</button>

					{[1, 2, 3].map((page) => (
						<button
							key={page}
							className={`w-10 h-10 rounded-md ${page === 1
									? "bg-indigo-600 text-white"
									: "bg-gray-700 hover:bg-gray-600"
								} transition-colors`}
						>
							{page}
						</button>
					))}

					<span className="flex items-center px-2">...</span>

					<button className="w-10 h-10 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors">
						10
					</button>

					<button className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors">
						<FaChevronRight />
					</button>
				</div>
			</div>

			{/* Mobile Pagination */}
			<div className="md:hidden flex items-center justify-between p-4 bg-gray-800 border-t border-gray-700">
				<div className="text-sm text-gray-400">
					Page 1 of 10
				</div>
				<div className="flex space-x-2">
					<button
						className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						disabled={true}
					>
						<FaChevronLeft />
					</button>

					<div className="flex items-center px-3 bg-indigo-600 rounded-md">
						1
					</div>

					<button
						className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
					>
						<FaChevronRight />
					</button>
				</div>
			</div>
		</div>
	)
}