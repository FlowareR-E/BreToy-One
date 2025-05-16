package com.floware.bretoy_one.controller;

import com.floware.bretoy_one.model.Product;
import com.floware.bretoy_one.services.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


///  This class handles all HTTPS requests (for products only)
@RestController
@RequestMapping("/api/products")
public class ProductController {
    public final ProductService service;

    public ProductController(ProductService service){
        this.service = service;
    }

    @GetMapping("/get")
    public List<Product> GetAllProducts()
    {
        return service.getAllProducts();
    }

    @PostMapping("/add")
    public Product createProduct(@RequestBody Product product){
        return service.createProduct(product);
    }
}
