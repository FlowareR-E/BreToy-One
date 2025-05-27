package com.floware.bretoy_one.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.floware.bretoy_one.model.Product;
import com.floware.bretoy_one.services.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import payload.InventoryMetricsResponse;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProductService service;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetAllProducts() throws Exception {
        List<Product> products = List.of(new Product("Item1", "Cat1", 10f, 2));
        when(service.getAllProducts()).thenReturn(products);

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Item1"));
    }

    @Test
    public void testCreateProduct() throws Exception {
        Product input = new Product("New", "Cat", 20f, 5);
        Product saved = new Product("New", "Cat", 20f, 5);
        saved.setId(1);

        when(service.createProduct(any(Product.class))).thenReturn(saved);

        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("New"));
    }

    @Test
    public void testDeleteProductSuccess() throws Exception {
        when(service.deleteProduct(1)).thenReturn(true);

        mockMvc.perform(delete("/api/products/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testDeleteProductNotFound() throws Exception {
        when(service.deleteProduct(99)).thenReturn(false);

        mockMvc.perform(delete("/api/products/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Product with ID 99 not found"));
    }

    @Test
    public void testOutOfStockSuccess() throws Exception {
        when(service.outOfStock(1)).thenReturn(true);

        mockMvc.perform(post("/api/products/1/outofstock"))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testOutOfStockNotFound() throws Exception {
        when(service.outOfStock(999)).thenReturn(false);

        mockMvc.perform(post("/api/products/999/outofstock"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetMetrics() throws Exception {
        InventoryMetricsResponse dummyResponse = new InventoryMetricsResponse();
        dummyResponse.setTotalProducts(5);
        when(service.getAllMetrics()).thenReturn(dummyResponse);

        mockMvc.perform(get("/api/products/metrics"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.totalProducts").value(5));
    }

    @Test
    public void testUpdateProduct() throws Exception {
        Product input = new Product("Updated", "Cat", 15f, 8);
        Product updated = new Product("Updated", "Cat", 15f, 8);
        updated.setId(1);

        when(service.updateProduct(eq(1), any(Product.class))).thenReturn(updated);

        mockMvc.perform(put("/api/products/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Updated"));
    }
}
