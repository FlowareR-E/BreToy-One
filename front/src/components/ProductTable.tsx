import { useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown, FaSyncAlt, FaPlus } from "react-icons/fa";
import { useProducts } from "../hooks/useProduct";
import type { Product } from "../api/types/product";
import { multiSortData, type SortConfig, type SortDirection } from "../utils/sortUtils";
import { ConfimationModal } from "./ConfirmationModal";
import { ProductModal } from "./ProductModal";
import { filterProducts, type ProductFilter } from "../utils/filterUtils";

type SortableField = keyof Pick<Product, "id" | "name" | "category" | "quantity" | "price">;
type ConfirmationModalAction = '' | 'delete' | 'toggleStock';

type ConfirmationModalState = {
	isOpen: boolean;
	productToDelete: Product | null,
	productToToggleStock: Product | null,
	actionType: ConfirmationModalAction
}


interface ProductTableProps {
	activeFilters: ProductFilter;
	categories: string[];
	onProductsLoaded?: (products: Product[]) => void
}

export const ProductTable = ({ activeFilters, onProductsLoaded, categories }: ProductTableProps) => {
	const [products, setProducts] = useState<Product[]>([]);
	const { fetchProducts, deleteProduct, updateProduct, createProduct, toggleStock, loading, error } = useProducts();
	const [createModalState, setCreateModalState] = useState(false);
	const [editModalState, setEditModalState] = useState<{
		isOpen: boolean; product: Product | null
	}>({ isOpen: false, product: null });

	const [confirmationModalState, setConfirmationModalState] = useState<ConfirmationModalState>({
		isOpen: false,
		productToDelete: null as Product | null,
		productToToggleStock: null as Product | null,
		actionType: ''
	})

	const handleEditClick = (product: Product) => {
		setEditModalState({
			isOpen: true,
			product
		})
	}

	const handleUpdateProduct = async (productData: Omit<Product, "id">) => {
		if (!editModalState.product?.id) return;

		try {
			await updateProduct(editModalState.product.id, productData);
			handleFetchProducts();
			setEditModalState({ isOpen: false, product: null })
		} catch (err) {
			console.error("Error updating product: " + err)
			throw err;
		}

	}

	const [pagination, setPagination] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalItems: 0
	})
	const [sortConfigs, setSortConfigs] = useState<SortConfig<Product>[]>([]);

	useEffect(() => {
		handleFetchProducts();
	}, []);

	useEffect(() => {
		setPagination(prev => ({
			...prev,
			currentPage: 1
		}))
	}, [activeFilters])

	useEffect(() => {
		setPagination(prev => ({ ...prev, currentPage: 1 }));
	}, [sortConfigs])

	const handleFetchProducts = async () => {
		const loadProducts = async () => {
			const data = await fetchProducts();
			setProducts(data);
			setPagination(prev => ({
				...prev,
				totalItems: data.length,
			}));
			onProductsLoaded?.(data);
		};
		loadProducts();
	}


	const getPaginatedData = () => {
		const { currentPage, itemsPerPage } = pagination;
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return filteredAndSortedProducts.slice(startIndex, endIndex);
	};

	const handlePageChange = (newPage: number) => {
		setPagination(prev => ({
			...prev,
			currentPage: newPage
		}));
	};

	const totalPages = Math.ceil(pagination.totalItems / pagination.itemsPerPage);


	const handleCreateProduct = async (productData: Omit<Product, "id">) => {
		try {
			await createProduct(productData);
			handleFetchProducts();
			setCreateModalState(false);
		} catch (err) {
			console.log(err instanceof Error ? err.message : "API Error");
			throw err;
		}
	}

	const handleDeleteClick = async (product: Product) => {
		setConfirmationModalState({
			isOpen: true,
			productToDelete: product,
			productToToggleStock: null,
			actionType: 'delete'
		});
	}

	const handleToggleStockClick = (product: Product) => {
		setConfirmationModalState({ isOpen: true, productToToggleStock: product, productToDelete: null, actionType: "toggleStock" })
	}

	const handleConfirm = () => {
		if (confirmationModalState.actionType === 'delete') {
			handleConfirmDelete();
		} else if (confirmationModalState.actionType === 'toggleStock') {
			handleConfirmToggleStock();
		}
	}
	const handleConfirmToggleStock = async () => {
		if (!confirmationModalState.productToToggleStock?.id) return;

		try {
			await toggleStock(confirmationModalState.productToToggleStock.id, !confirmationModalState.productToToggleStock.quantity);
			handleFetchProducts();
		} finally {
			setConfirmationModalState({
				isOpen: false,
				productToDelete: null,
				productToToggleStock: null,
				actionType: ''
			})
		}
	}

	const handleConfirmDelete = async () => {
		if (!confirmationModalState.productToDelete?.id) return;

		await deleteProduct(confirmationModalState.productToDelete.id);
		handleFetchProducts();
		setConfirmationModalState({ isOpen: false, productToDelete: null, productToToggleStock: null, actionType: '' });
	};

	const handleCloseConfirmationModal = () => {
		setConfirmationModalState({ isOpen: false, productToDelete: null, productToToggleStock: null, actionType: '' });
		handleFetchProducts();
	};

	const requestSort = (key: SortableField, event: React.MouseEvent) => {
		event.preventDefault();

		setSortConfigs(prev => {
			const isShiftKey = event.nativeEvent.shiftKey;
			const existingIndex = prev.findIndex(config => config.key === key);

			if (existingIndex >= 0) {
				const newConfigs = [...prev];
				if (newConfigs[existingIndex].direction === 'asc') {
					newConfigs[existingIndex] = { key, direction: 'desc' as SortDirection };
					return newConfigs;
				}
				return newConfigs.filter((_, i) => i !== existingIndex);
			}

			if (isShiftKey && prev.length > 0) {
				const newConfig = { key, direction: 'asc' as SortDirection };
				return [...prev.slice(0, 1), newConfig];
			}

			return [{ key, direction: 'asc' as SortDirection }];
		});
	};
	const filteredAndSortedProducts = useMemo(() => {
		const filtered = filterProducts(products, activeFilters);
		return sortConfigs.length > 0 ? multiSortData(filtered, sortConfigs) : filtered;
	}, [products, activeFilters, sortConfigs])


	useEffect(() => {
		setPagination(prev => ({ ...prev, totalItems: filteredAndSortedProducts.length }))
	}, [filteredAndSortedProducts]);


	const getSortPriority = (key: SortableField) => {
		const index = sortConfigs.findIndex(c => c.key === key);
		return index >= 0 ? index + 1 : null;
	}
	const getSortIcon = (key: SortableField) => {
		const config = sortConfigs.find(c => c.key === key);

		if (!config) return <FaSort className="ml-1 text-gray-400" />
		return config.direction === 'asc'
			? <FaSortUp className="ml-1 text-indigo-400" />
			: <FaSortDown className="ml-1 text-indigo-400" />
	}



	if (loading && products.length === 0) {
		return <div className="p-8 text-center">Loading...</div>;
	}

	if (error) return <div className="p-8 text-center text-red-400">Error: {error}</div>;

	return (


		<div className="bg-gray-800 rounded-xl shadow-lg shadow-black/30 overflow-hidden">

			<ConfimationModal
				isOpen={confirmationModalState.isOpen}
				onClose={handleCloseConfirmationModal}
				onConfirm={handleConfirm}
				title={confirmationModalState.actionType === 'delete' ? 'Delete Product' : 'Update Stock Status'}
				message={confirmationModalState.actionType === 'delete' ?
					`Are you sure you want to delete "${confirmationModalState.productToDelete?.name}?"` :
					`Do you want to mark: "${confirmationModalState.productToToggleStock?.name}" as "${confirmationModalState.productToToggleStock?.quantity ?? 0 > 0 ? "Out of Stock" : "In Stock"
					}"`}
				confirmText={confirmationModalState.actionType === 'delete' ? 'Delete' : 'Update'}
				danger={true}
			/>

			<ProductModal
				isOpen={createModalState}
				onClose={() => setCreateModalState(false)}
				onSubmit={handleCreateProduct}
				title="Add new Product"
				categories={categories}
			/>

			<ProductModal
				isOpen={editModalState.isOpen}
				onClose={() => setEditModalState({ isOpen: false, product: null })}
				onSubmit={handleUpdateProduct}
				title="Edit a product"
				initialData={editModalState.product}
				categories={categories}
			/>

			<div className="h-12 bg-gray-700 rounded-lg mb-3 flex items-center justify-between px-4">
				<h2 className="text-lg font-semibold hidden md:block">Products</h2>
				<div className="flex justify-between w-full md:w-auto md:space-x-3">
					<button
						onClick={() => setCreateModalState(true)}
						className="flex items-center p-1.5 md:px-3 md:py-1.5 bg-indigo-600 text-gray-50 hover:bg-indigo-500 rounded-md text-sm transition-colors"
					>
						<FaPlus className="mr-2" /> Add new
					</button>
				</div>
			</div>
			{/* Desktop Header */}
			<div className="hidden md:block">
				<div className="grid grid-cols-12 bg-gray-700 p-4 rounded-t-lg items-center">
					<div
						className="col-span-1 font-medium flex items-center justify-center cursor-pointer hover:text-indigo-300"
						onClick={(e) => requestSort("id", e)}
					>ID {getSortIcon('id')}
						{getSortPriority("id") && (<span className="ml-1 text-xs text-indigo-300"> {getSortPriority("id")}</span>)}
					</div>
					<div
						className="col-span-3 font-medium flex items-center justify-center cursor-pointer hover:text-indigo-300"
						onClick={(e) => requestSort("name", e)}
					>Name {getSortIcon('name')}
						{getSortPriority("name") && (<span className="ml-1 text-xs text-indigo-300"> {getSortPriority("name")}</span>)}

					</div>
					<div
						className="col-span-2 font-medium flex items-center justify-center cursor-pointer hover:text-indigo-300"
						onClick={(e) => requestSort("category", e)}
					>Category {getSortIcon('category')}
						{getSortPriority("category") && (<span className="ml-1 text-xs text-indigo-300"> {getSortPriority("category")}</span>)}

					</div>
					<div
						className="col-span-1 font-medium flex items-center justify-center cursor-pointer hover:text-indigo-300"
						onClick={(e) => requestSort("quantity", e)}
					>Stock {getSortIcon('quantity')}
						{getSortPriority("quantity") && (<span className="ml-1 text-xs text-indigo-300"> {getSortPriority("quantity")}</span>)}
					</div>
					<div
						className="col-span-2 font-medium flex items-center justify-center cursor-pointer hover:text-indigo-300"
						onClick={(e) => requestSort("price", e)}
					>Price {getSortIcon('price')}
						{getSortPriority("price") && (<span className="ml-1 text-xs text-indigo-300"> {getSortPriority("price")}</span>)}
					</div>
					<div
						className="col-span-2 font-medium text-cente"
					>Status
					</div>
					<div className="col-span-1 font-medium text-center">Actions</div>
				</div>

				{/* Desktop Body */}
				<div className="divide-y divide-gray-700">
					{getPaginatedData().map((item, index) => (
						<div
							key={index}
							className="grid grid-cols-12 p-4 items-center hover:bg-gray-750 transition-colors"
						>
							<div className="col-span-1 text-indigo-400 font-mono">{item.id}</div>
							<div className="col-span-3 truncate">{item.name}</div>
							<div className="col-span-2 text-gray-400">{item.category}</div>
							<div className="col-span-1 text-center">{item.quantity}</div>
							<div className="col-span-2 text-center">${item.price.toFixed(2)}</div>
							<div className="col-span-2 text-center">
								<span
									onClick={() => handleToggleStockClick(item)}
									className={`px-2 py-1 cursor-pointer rounded-full text-xs ${item.quantity > 0 ? (item.quantity > 10 ?
										 "bg-green-900 text-green-300" : "bg-yellow-900 hover:bg-yellow-700 text-yellow-300") : 
										 "bg-red-900 hover:bg-red-700 text-red-300"}`}
								> {item.quantity > 0 ? (item.quantity > 10 ? "In Stock " : "Low Stock") : "Out of Stock"}
								</span>

							
							</div>
							<div className="col-span-1 flex justify-center space-x-2">
								<button
									className="p-1 text-gray-400 hover:text-indigo-400 transition-colors"
									onClick={() => handleEditClick(item)}
								>
									<FaEdit />
								</button>
								<button
									className="p-1 text-gray-400 hover:text-red-400 transition-colors"
									onClick={() => handleDeleteClick(item)}
								>
									<FaTrash />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Mobile Cards */}
			<div className="md:hidden">
				{getPaginatedData().map((item, index) => (
					<div key={index} className="p-4 border-b border-gray-700">
						<div className="flex justify-between items-start mb-2">
							<div className="text-indigo-400 font-mono">ID: {item.id}</div>
							<span className={`px-2 py-1 rounded-full text-xs ${item.quantity > 0
									? (item.quantity > 10 ? "bg-green-900 text-green-300" : "bg-yellow-900 text-yellow-300")
									: "bg-red-900 text-red-300"
								}`}>
								{item.quantity > 0 ? "In Stock" : "Out of Stock"}
							</span>
						</div>
						<div className="text-lg font-medium mb-1">{item.name}</div>
						<div className="text-gray-400 text-sm mb-2">{item.category}</div>

						<div className="grid grid-cols-2 gap-2 text-sm mt-3">
							<div>
								<div className="text-gray-500">Stock</div>
								<div>{item.quantity}</div>
							</div>
							<div>
								<div className="text-gray-500">Price</div>
								<div>${item.price.toFixed(2)}</div>
							</div>
						</div>

						<div className="flex justify-end space-x-3 mt-3">
							<button className="flex items-center text-sm text-indigo-400">
								<FaEdit
									className="mr-1"
									onClick={() => handleEditClick(item)}
								/> Edit
							</button>
							<button className="flex items-center text-sm text-red-400">
								<FaTrash
									className="mr-1"
									onClick={() => handleDeleteClick(item)}
								/> Delete
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Desktop Pagination */}
			<div className="hidden md:flex items-center justify-between p-4 bg-gray-800 border-t border-gray-700">
				<div className="text-sm text-gray-400">
					Showing {(pagination.currentPage - 1) * pagination.itemsPerPage + 1} to{' '}
					{Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
					{pagination.totalItems} items
				</div>
				<div className="flex space-x-2">
					<button
						className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						onClick={() => handlePageChange(pagination.currentPage - 1)}
						disabled={pagination.currentPage === 1}
					>
						<FaChevronLeft />
					</button>

					{Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
						const page = i + 1;
						return (
							<button
								key={page}
								className={`w-10 h-10 rounded-md ${page === pagination.currentPage
									? "bg-indigo-600 text-white"
									: "bg-gray-700 hover:bg-gray-600"
									} transition-colors`}
								onClick={() => handlePageChange(page)}
							>
								{page}
							</button>
						);
					})}

					{totalPages > 3 && (
						<>
							{pagination.currentPage > 3 && pagination.currentPage < totalPages - 2 && (
								<div className="flex items-center px-2">...</div>
							)}

							{pagination.currentPage > 3 && (
								<button
									className={`w-10 h-10 rounded-md ${pagination.currentPage > 3 && pagination.currentPage < totalPages - 2
										? "bg-indigo-600 text-white"
										: "bg-gray-700 hover:bg-gray-600"
										} transition-colors`}
									onClick={() => handlePageChange(pagination.currentPage)}
								>
									{pagination.currentPage}
								</button>
							)}

							{totalPages > 4 && pagination.currentPage < totalPages - 2 && (
								<div className="flex items-center px-2">...</div>
							)}

							{totalPages > 3 && (
								<button
									className={`w-10 h-10 rounded-md ${pagination.currentPage === totalPages
										? "bg-indigo-600 text-white"
										: "bg-gray-700 hover:bg-gray-600"
										} transition-colors`}
									onClick={() => handlePageChange(totalPages)}
								>
									{totalPages}
								</button>
							)}
						</>
					)}

					<button
						className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						onClick={() => handlePageChange(pagination.currentPage + 1)}
						disabled={pagination.currentPage === totalPages}
					>
						<FaChevronRight />
					</button>
				</div>
			</div>

			{/* Mobile Pagination */}
			<div className="md:hidden flex items-center justify-between p-4 bg-gray-800 border-t border-gray-700">
				<div className="text-sm text-gray-400">
					Page {pagination.currentPage} of {totalPages}
				</div>
				<div className="flex space-x-2">
					<button
						className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						onClick={() => handlePageChange(pagination.currentPage - 1)}
						disabled={pagination.currentPage === 1}
					>
						<FaChevronLeft />
					</button>

					<div className="flex items-center px-3 bg-indigo-600 rounded-md">
						{pagination.currentPage}
					</div>

					<button
						className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						onClick={() => handlePageChange(pagination.currentPage + 1)}
						disabled={pagination.currentPage === totalPages}
					>
						<FaChevronRight />
					</button>
				</div>
			</div>
		</div>
	)
}