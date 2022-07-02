package com.barclays.store.dto;

import lombok.Data;



@Data
public class ProductDTO {

    private String name;


    private Float mrp;

    private Float discountPercentage;

    private Integer availableQuantity;

    private Float discountSellingPrice;

    private Float weightInGms;

    private Boolean outOfStock;

    private Integer quantity;

}
