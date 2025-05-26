import React, { useEffect, useState } from 'react';
import { useProducts } from "../hooks/useProduct";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { InventoryMetrics } from '../api/types/product';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const MetricChart: React.FC = () => {
  const [metrics, setMetrics] = useState<InventoryMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const { fetchMetrics } = useProducts();

  const getMetrics = async () => {
    try {
      setLoading(true);
      const data = await fetchMetrics();
      setMetrics(data);
    } catch (err) {
      console.error("Failed to fetch metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMetrics();
  }, []);

  if (!metrics || loading) {
    return <p className="text-gray-400">Loading metrics...</p>;
  }

  const categories = metrics.metricsByCategory.map((item) => item.category);

  const stockByCategoryData = {
    labels: categories,
    datasets: [
      {
        label: 'Products In Stock',
        data: metrics.metricsByCategory.map((item) => item.totalProductsInStock),
        backgroundColor: '#34D399',
      },
    ],
  }; 
   const getColor = (index: number) => {
    const colors = ['#60A5FA', '#FBBF24', '#34D399', '#F87171', '#A78BFA'];
    return colors[index % colors.length];
  };

  const avgPriceByCategoryData = {
    labels: ['Average Price'],
    datasets: metrics.metricsByCategory.map((item, index) => ({
      label: item.category,
      data: [item.averagePrice],
      backgroundColor: getColor(index),
    })),
  };
  

  

  return (
    <div className="mt-8 bg-gray-800 rounded-xl shadow-lg p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Metrics</h2>
        <button
          onClick={getMetrics}
          className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded transition"
        >
          Refresh
        </button>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Total Products</p>
          <p className="text-2xl font-bold">{metrics.totalProducts}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Total Inventory Value</p>
          <p className="text-2xl font-bold">${metrics.totalInventoryValue.toLocaleString()}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Average Price</p>
          <p className="text-2xl font-bold">${metrics.averagePrice.toFixed(2)}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Products In Stock by Category</h3>
          <Bar data={stockByCategoryData} options={{ responsive: true }} />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Average Price by Category</h3>
          <Bar
            data={avgPriceByCategoryData}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => `$${value}`,
                  },
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) =>
                      `Average Price: $${context.parsed.y.toFixed(2)}`,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
