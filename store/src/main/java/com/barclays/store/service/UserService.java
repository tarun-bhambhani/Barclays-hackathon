package com.barclays.store.service;

import com.barclays.store.dto.CartDTO;
import com.barclays.store.dto.CustomerDTO;

public interface UserService {
	CustomerDTO authenticateCustomer(String emailId, String password);
	public void logoutCustomer();
	CartDTO getCartdetails(Integer customerId, Integer cartId);
}
