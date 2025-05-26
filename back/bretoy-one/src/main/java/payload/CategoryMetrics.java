package payload;

public class CategoryMetrics {
    private String category;
    private int totalProductsInStock;
    private double totalInventoryValue;
    private double averagePrice;

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getTotalProductsInStock() {
        return totalProductsInStock;
    }

    public void setTotalProductsInStock(int totalProductsInStock) {
        this.totalProductsInStock = totalProductsInStock;
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
}
