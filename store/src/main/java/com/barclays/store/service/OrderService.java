package com.barclays.store.service;

public interface OrderService {
	public void getOrderDetails(Integer customerId);
	public void createOrder(Integer customerId);
}
