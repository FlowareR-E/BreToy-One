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

}
