package com.barclays.store.service;

import java.util.List;

import com.barclays.store.dto.ProductDTO;

public interface ProductService {
	ProductDTO getProductDetails(Integer productId);
	List<ProductDTO> getAllProducts();
}
