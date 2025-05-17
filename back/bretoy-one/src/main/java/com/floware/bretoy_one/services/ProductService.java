package com.floware.bretoy_one.services;

import com.floware.bretoy_one.memory.ProductRepository;
import com.floware.bretoy_one.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
