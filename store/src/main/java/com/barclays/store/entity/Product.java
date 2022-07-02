package com.barclays.store.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data

public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="product_id")
    private Integer productId;

    @Column(name="product_name")
    private String name;

    @Column(name="maximum_retail_price")
    private Float mrp;

    @Column(name="discount_percentage")
    private Float discountPercentage;

    @Column(name="available_quantity")
    private Integer availableQuantity;

    @Column(name="discount_selling_price")
    private Float discountSellingPrice;

    @Column(name="weight")
    private Float weightInGms;

    @Column(name="out_of_stock")
    private Boolean outOfStock;

    @Column(name="quantity")
    private Integer quantity;

}
