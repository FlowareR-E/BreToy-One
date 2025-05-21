import { useState, useEffect } from "react";
import type { Product } from "../api/types/product";

type CreateModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (product: Omit<Product, "id">) => Promise<void>;
};

export const CreateModal = ({ isOpen, onClose, onCreate }: CreateModalProps) => {
    const [formData, setFormData] = useState<Omit<Product, "id">>({
        name: "",
        category: "",
        price: 0,
        quantity: 0,
        inStock: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            inStock: prev.quantity > 0
        }));
    }, [formData.quantity]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "price" || name === "quantity"
                ? Number(value)
                : value
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
            await onCreate(formData);
            setFormData({
                name: "",
                category: "",
                price: 0,
                quantity: 0,
                inStock: false,
            });
            setErrors({});
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
                <h3 className="text-xl font-semibold mb-4">Create New Product</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Product Name *
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
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
                        <input
                            id="category"
                            name="category"
                            type="text"
                            value={formData.category}
                            onChange={handleChange}
                            className={`w-full bg-gray-700 border ${errors.category ? "border-red-500" : "border-gray-600"
                                } rounded-md px-3 py-2 text-sm`}
                            placeholder="Enter category"
                        />
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
                                    min="0.01"
                                    step="0.01"
                                    value={formData.price}
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
                            id="inStock"
                            className={`h-4 w-4 border-gray-600 rounded ${formData.quantity > 0 ? "bg-green-500" : "bg-red-500"}`}
                        />
                        <label htmlFor="inStock" className="ml-2 text-sm">
                            {formData.inStock ? "In Stock" : "Out of Stock"}
                        </label>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
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
                            {isSubmitting ? "Creating..." : "Create Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};