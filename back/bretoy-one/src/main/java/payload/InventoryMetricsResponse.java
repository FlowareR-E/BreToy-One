package payload;

import java.util.List;

public class InventoryMetricsResponse {

    private int totalProductsInStock;
    private int totalProductsOutOfStock;

    private int totalProducts;
    private double totalInventoryValue;
    private double averagePrice;

    private List<CategoryMetrics> metricsByCategory;

    public int getTotalProductsInStock() {
        return totalProductsInStock;
    }

    public void setTotalProductsInStock(int totalProductsInStock) {
        this.totalProductsInStock = totalProductsInStock;
    }

    public int getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(int totalProducts) {
        this.totalProducts = totalProducts;
    }

    public double getTotalInventoryValue() {
        return totalInventoryValue;
    }

    public void setTotalInventoryValue(double totalInventoryValue) {
        this.totalInventoryValue = totalInventoryValue;
    }

    public double getAveragePrice() {
        return averagePrice;
    }

    public void setAveragePrice(double averagePrice) {
        this.averagePrice = averagePrice;
    }

    public List<CategoryMetrics> getMetricsByCategory() {
        return metricsByCategory;
    }

    public void setMetricsByCategory(List<CategoryMetrics> metricsByCategory) {
        this.metricsByCategory = metricsByCategory;
    }

    public int getTotalProductsOutOfStock() {
        return totalProductsOutOfStock;
    }

    public void setTotalProductsOutOfStock(int totalProductsOutOfStock) {
        this.totalProductsOutOfStock = totalProductsOutOfStock;
    }
}
