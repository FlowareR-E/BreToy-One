package com.floware.bretoy_one.controller;

import com.floware.bretoy_one.model.Product;
import com.floware.bretoy_one.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    public final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Product>> GetAllProducts() {
        System.out.println("[GET] /api/products - Fetching all products");
        List<Product> products = service.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        System.out.println("[POST] /api/products - Creating new product: " + product);
        Product savedProduct = service.createProduct(product);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable int id, @RequestBody Product product) {
        System.out.printf("[PUT] /api/products/%d - Updating product with data: %s%n", id, product);
        Product updatedProduct = service.updateProduct(id, product);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable int id) {
        System.out.printf("[DELETE] /api/products/%d - Deleting product%n", id);
        boolean success = service.deleteProduct(id);
        if (success) return ResponseEntity.noContent().build();

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of(
                        "status", "error",
                        "message", "Product with ID " + id + " not found",
                        "timestamp", Instant.now()
                ));
    }

    @PostMapping("/{id}/outofstock")
    public ResponseEntity<?> outStock(@PathVariable int id) {
        System.out.printf("[POST] /api/products/%d/outofstock - Marking product as out of stock%n", id);
        boolean success = service.outOfStock(id);
        if (success) return ResponseEntity.noContent().build();
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of(
                        "status", "error",
                        "message", "Product with ID " + id + " not found",
                        "timestamp", Instant.now()
                ));
    }

    @PutMapping("/{id}/instock")
    public ResponseEntity<?> inStock(@PathVariable int id) {
        System.out.printf("[PUT] /api/products/%d/instock - Marking product as in stock%n", id);
        boolean success = service.inStock(id);
        if (success) return ResponseEntity.noContent().build();
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of(
                        "status", "error",
                        "message", "Product with ID " + id + " not found",
                        "timestamp", Instant.now()
                ));
    }
}