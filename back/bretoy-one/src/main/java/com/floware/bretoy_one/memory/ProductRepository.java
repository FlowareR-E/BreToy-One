package com.floware.bretoy_one.memory;

import com.floware.bretoy_one.model.Product;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

///  This class handles all storage logic (can be replaced with an actual db)
@Repository
public class ProductRepository {
    private final List<Product> products = new ArrayList<>();
    private final AtomicInteger idCounter = new AtomicInteger(1);

    public List<Product> GetAll() {
        return new ArrayList<>(products);
    }

    public Product SaveProduct(Product product){
        if(product.getId() == 0){
            product.setId(idCounter.getAndIncrement());
        }
        else {
            products.replaceAll(p -> p.getId() == product.getId() ? product : p);
        }
        products.add(product);
        return product;
    }

    public boolean DeleteByID(int id){
        return products.removeIf(p -> p.getId() == id);
    }
}