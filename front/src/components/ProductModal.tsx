import { useState, useEffect, useRef } from "react";
import type { Product } from "../api/types/product";

type ProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (product: Omit<Product, "id">) => Promise<void>;
    title: string;
    initialData?: Omit<Product, "id"> | null
    categories?: string[];
};

export const ProductModal = ({ isOpen, onClose, onSubmit: onSubmit, title, initialData, categories }: ProductModalProps) => {

    const [formData, setFormData] = useState<Omit<Product, "id">>({
        name: "",
        category: "",
        price: 0,
        quantity: 0,
        ...initialData
    });
    const [isCustomCategory, setIsCustomCategory] = useState(false);
    const customCategoryRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData)
        }
    }, [initialData])

    useEffect(() => {
        if (isCustomCategory) {
            customCategoryRef.current?.focus();
        }
    }, [isCustomCategory]);

    const MAX_VALUE = 999999;
    const MIN_PRICE = 0;
    const MIN_QUANTITY = 0;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        if (name === "categorySelect") {
            if (value === "__custom__") {
                setIsCustomCategory(true);
                setFormData(prev => ({ ...prev, category: "" }));
            } else {
                setIsCustomCategory(false);
                setFormData(prev => ({ ...prev, category: value }));
            }
            return;
        }
    
        if (name === "price" || name === "quantity") {
            const numericValue = value === "" ? 0 : Number(value);
    
            const clampedValue = Math.min(Math.max(numericValue, name === "price" ? MIN_PRICE : MIN_QUANTITY), MAX_VALUE);
    
            setFormData(prev => ({
                ...prev,
                [name]: clampedValue,
            }));
            return;
        }
    
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    


    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.category?.trim()) newErrors.category = "Category is required";
        if (formData.price <= 0) newErrors.price = "Price must be positive";
        if (formData.quantity < 0) newErrors.quantity = "Quantity cannot be negative";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);
        try {
            await onSubmit({
                ...formData,
            });
            setFormData({
                name: "",
                category: "",
                price: 0,
                quantity: 0,
            });
            setErrors({});
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setFormData({
            name: "",
            category: "",
            price: 0,
            quantity: 0,
        });
        setErrors({})
        setIsCustomCategory(false);
        onClose();
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
                <h3 className="text-xl font-semibold mb-4">{title}</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Product Name *
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            maxLength={120}
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full bg-gray-700 border ${errors.name ? "border-red-500" : "border-gray-600"
                                } rounded-md px-3 py-2 text-sm`}
                            placeholder="Enter product name"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium mb-1">
                            Category *
                        </label>

                        {!isCustomCategory ? (
                            <select
                                id="categorySelect"
                                name="categorySelect"
                                value={formData.category || ""}
                                onChange={handleChange}
                                className={`w-full bg-gray-700 border ${errors.category ? "border-red-500" : "border-gray-600"} rounded-md px-3 py-2 text-sm`}
                            >
                                <option value="">Select a category</option>
                                {categories?.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                                <option value="__custom__">+ Add custom category</option>
                            </select>
                        ) : (
                            <input
                                id="category"
                                name="category"
                                type="text"
                                maxLength={120}
                                ref={customCategoryRef}
                                value={formData.category}
                                onChange={handleChange}
                                className={`w-full bg-gray-700 border ${errors.category ? "border-red-500" : "border-gray-600"} rounded-md px-3 py-2 text-sm`}
                                placeholder="Enter custom category"
                            />
                        )}

                        {errors.category && (
                            <p className="mt-1 text-sm text-red-400">{errors.category}</p>
                        )}
                    </div>




                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium mb-1">
                                Price *
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-2 text-gray-400">$</span>
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    min="0"
                                    max="999999"
                                    step="0.01"
                                    value={formData.price === 0 ? "" : formData.price}
                                    onChange={handleChange}
                                    className={`w-full bg-gray-700 border ${errors.price ? "border-red-500" : "border-gray-600"
                                        } rounded-md pl-8 pr-3 py-2 text-sm`}
                                />
                            </div>
                            {errors.price && (
                                <p className="mt-1 text-sm text-red-400">{errors.price}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="quantity" className="block text-sm font-medium mb-1">
                                Quantity *
                            </label>
                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                min="0"
                                max="999999"
                                step="1"                                
                                value={formData.quantity}
                                onChange={handleChange}
                                className={`w-full bg-gray-700 border ${errors.quantity ? "border-red-500" : "border-gray-600"
                                    } rounded-md px-3 py-2 text-sm`}
                            />
                            {errors.quantity && (
                                <p className="mt-1 text-sm text-red-400">{errors.quantity}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center mt-2">
                        <div
                            className={`h-4 w-4 border-gray-600 rounded ${formData.quantity > 0 ? "bg-green-500" : "bg-red-500"}`}
                        />
                        <label htmlFor="inStock" className="ml-2 text-sm">
                            {formData.quantity > 0 ? "In Stock" : "Out of Stock"}
                        </label>

                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isSubmitting}
                            className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                        >
                            {isSubmitting ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};