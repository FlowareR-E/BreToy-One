package com.floware.bretoy_one.model;

import java.time.LocalDateTime;

public class Product {

    private int id;
    private String name;
    private String category;
    private float price;
    private int quantity;
    private boolean inStock;

    private final LocalDateTime creationDate;
    private LocalDateTime updateDate;

    //region Constructors
    public Product(){
        this.creationDate = LocalDateTime.now();
        this.updateDate = LocalDateTime.now();
    }

    public Product(String name, String category, float price, int quantity) {
        this();
        this.id = 0;
        this.name = name;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
    }
    //endregion

    //region Getters & Setters
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public float getPrice() {
        return price;
    }
    public void setPrice(float price) {
        this.price = price;
        touch();
    }

    public String getCategory(){
        return this.category;
    }
    public void setCategory(String category){
        this.category = category;
        touch();
    }
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
        this.setInStock(this.quantity > 0);
        touch();
    }

    public boolean getInStock() { return inStock; }
    public void setInStock(boolean inStock){
        this.inStock = inStock;
        touch();
    }

    public LocalDateTime getCreationDate() { return creationDate; }

    public LocalDateTime getUpdateDate() { return updateDate; }

    private void touch(){
        this.updateDate = LocalDateTime.now();
    }
    //endregion
}
