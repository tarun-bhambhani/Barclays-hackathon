package com.barclays.store.dto;

import com.barclays.store.entity.Product;
import lombok.Data;

@Data
public class CartDTO {
    private Product product;

    private Integer quantity;

}
