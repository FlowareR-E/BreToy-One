# 📦 Inventory System by FlowareR

A very simple inventory management sytem with a RESTful API. Built to track your products, categories and built in metrics. 
Developed for the Encora Spark Program

---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Java / Spring Boot
- **API Format**: REST / JSON

---

## 📁 API

### Endpoints

Base URL /api

#### /products [GET] 

Returns a list of all the products in stock

#### /products [POST]

Adds a new product to the inventory example payload:
{
    "name" : "Iphone 15",
    "category" : "Technology",
    "price" : 23999.0,
    "quantity" : 50
}

#### /products/{id} [PUT]

Updates a product (same payload as above)


#### /products/{id} [DELETE]

Deletes a product 

#### /products/metrics [GET]

Returns all product metrics (Overall & Per Category)

#### /products/{id}/outofstock [POST]

Quickly marks a product out of stock (QTY: 0)

#### /products/{id}/instock [PUT]

Quickly marks a product as in stock (QTY: 10)
