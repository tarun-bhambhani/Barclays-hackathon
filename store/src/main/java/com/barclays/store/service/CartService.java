package com.barclays.store.service;

public interface CartService {
	public void addProduct(Integer productId, Integer cartId, Integer quantity);
	public void deleteProduct(Integer productId, Integer cartId);
	public void updateProduct(Integer productId, Integer cartId, Integer quantity);

}
