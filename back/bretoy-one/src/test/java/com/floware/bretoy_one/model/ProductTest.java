package com.floware.bretoy_one.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class ProductTest {

    private Product product;

    @BeforeEach
    public void setup() {
        product = new Product("Test Product", "Electronics", 99.99f, 10);
    }

    @Test
    public void testConstructorInitializesFieldsCorrectly() {
        assertEquals("Test Product", product.getName());
        assertEquals("Electronics", product.getCategory());
        assertEquals(99.99f, product.getPrice());
        assertEquals(10, product.getQuantity());
        assertNotNull(product.getCreationDate());
        assertNotNull(product.getUpdateDate());
    }

    @Test
    public void testTouchUpdatesUpdateDate() throws InterruptedException {
        LocalDateTime originalUpdateDate = product.getUpdateDate();
        Thread.sleep(10); // Ensure time difference
        product.setPrice(199.99f);
        assertTrue(product.getUpdateDate().isAfter(originalUpdateDate));
    }

    @Test
    public void testSettersUpdateFields() {
        product.setName("Updated");
        product.setCategory("UpdatedCategory");
        product.setQuantity(50);
        product.setPrice(59.99f);

        assertEquals("Updated", product.getName());
        assertEquals("UpdatedCategory", product.getCategory());
        assertEquals(50, product.getQuantity());
        assertEquals(59.99f, product.getPrice());
    }

    @Test
    public void testToStringFormat() {
        String output = product.toString();
        assertTrue(output.contains("Test Product"));
        assertTrue(output.contains("Electronics"));
    }
}
