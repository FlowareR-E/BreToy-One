package com.floware.bretoy_one.services;

import com.floware.bretoy_one.memory.ProductRepository;
import com.floware.bretoy_one.model.Product;
import org.springframework.stereotype.Service;
import payload.CategoryMetrics;
import payload.InventoryMetricsResponse;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> getAllProducts(){
        return repository.GetAll();
    }

    public Product createProduct(Product product){
        return repository.SaveProduct(product);
    }

    public  Product updateProduct(int id, Product product){
        product.setId(id);
        return repository.SaveProduct(product);
    }

    public boolean deleteProduct(int id){
        return repository.DeleteByID(id);
    }

    public boolean outOfStock(int id){
        return repository.MarkInOutStockByID(id, false);
    }

    public boolean inStock(int id){
        return repository.MarkInOutStockByID(id, true);
    }

    public InventoryMetricsResponse getAllMetrics() {
        List<Product> allProducts = repository.GetAll();

        int total = allProducts.size();
        List<Product> inStockProducts = allProducts.stream()
                .filter(p -> p.getQuantity() > 0)
                .toList();

        int inStock = inStockProducts.size();
        int outOfStock = total - inStock;

        double totalInventoryValue = inStockProducts.stream()
                .mapToDouble(p -> p.getPrice() * p.getQuantity())
                .sum();

        double averagePrice = inStock > 0
                ? inStockProducts.stream().mapToDouble(Product::getPrice).average().orElse(0.0)
                : 0.0;

        Map<String, List<Product>> productsByCategory = inStockProducts.stream()
                .collect(Collectors.groupingBy(Product::getCategory));

        List<CategoryMetrics> categoryMetricsList = productsByCategory.entrySet().stream()
                .map(entry -> {
                    String category = entry.getKey();
                    List<Product> products = entry.getValue();

                    int categoryTotalInStock = products.size();
                    double categoryInventoryValue = products.stream()
                            .mapToDouble(p -> p.getPrice() * p.getQuantity())
                            .sum();
                    double categoryAveragePrice = products.stream()
                            .mapToDouble(Product::getPrice)
                            .average().orElse(0.0);

                    CategoryMetrics metrics = new CategoryMetrics();
                    metrics.setCategory(category);
                    metrics.setTotalProductsInStock(categoryTotalInStock);
                    metrics.setTotalInventoryValue(categoryInventoryValue);
                    metrics.setAveragePrice(categoryAveragePrice);

                    return metrics;
                })
                .collect(Collectors.toList());

        InventoryMetricsResponse response = new InventoryMetricsResponse();
        response.setTotalProducts(total);
        response.setTotalProductsInStock(inStock);
        response.setTotalProductsOutOfStock(outOfStock);
        response.setTotalInventoryValue(totalInventoryValue);
        response.setAveragePrice(averagePrice);
        response.setMetricsByCategory(categoryMetricsList);

        return response;
    }


}
