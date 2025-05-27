package com.floware.bretoy_one.services;

import com.floware.bretoy_one.memory.ProductRepository;
import com.floware.bretoy_one.model.Product;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.List;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository repository;

    @InjectMocks
    private ProductService service;

    @Test
    public void getAllProducts_ReturnsAllProducts(){
        Product product1 = new Product("TestName1", "TestCategory1",  999, 100);
        Product product2= new Product("TestName2", "TestCategory2",  499, 0);
        when(repository.GetAll()).thenReturn(List.of(product1, product2));

        List<Product> products = service.getAllProducts();

        assertEquals(2, products.size());
        verify(repository, times(1)).GetAll();
    }


    @Test
    public void addProduct_SavesProduct(){
        Product newProduct = new Product("TestName3", "TestCategory1",  99, 10);
        Product savedProduct = new Product("TestName4", "TestCategory2",  50, 10);
        savedProduct.setId(3);
        when(repository.SaveProduct(newProduct)).thenReturn(savedProduct);

        Product result = service.createProduct(newProduct);

        assertEquals(3, result.getId());
        assertEquals("TestName4", result.getName());
        assertEquals("TestCategory2", result.getCategory());
        assertEquals(50, result.getPrice());
        assertEquals(10, result.getQuantity());
    }
}
