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
            products.add(product);
        }
        else {
            products.replaceAll(p-> {
                if(p.getId() == product.getId()){
                    p.setName(product.getName());
                    p.setCategory(product.getCategory());
                    p.setQuantity(product.getQuantity());
                    p.setPrice(product.getPrice());
                }
                return p;
            }
            );
        }
        return product;
    }

    public boolean DeleteByID(int id){
        return products.removeIf(p -> p.getId() == id);
    }

    public boolean MarkInOutStockByID(int id, boolean inStock){
        return products.stream()
                .filter(p -> p.getId() == id)
                .findFirst()
                .map(product -> {
                    product.setQuantity(inStock ? 10 : 0);
                    return true;
                })
                .orElse(false);
    }

}