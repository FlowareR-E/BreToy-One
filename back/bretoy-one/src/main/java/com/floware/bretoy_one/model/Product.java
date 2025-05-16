package com.floware.bretoy_one.model;

public class Product {
    private int id;
    private String name;
    private float price;
    private int quantity;

    //region Constructors
    public Product(){}

    public Product(String name, float price, int quantity) {
        this.id = 0;
        this.name = name;
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
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    //endregion
}
