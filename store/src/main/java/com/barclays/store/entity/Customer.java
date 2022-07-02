package com.barclays.store.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;


@Entity
public class Customer {
	@Id
	private String emailId;
	
	private String name;
	
	private String password;

	private String phoneNumber;

	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="CUSTOMER_EMAIL_ID")
	private Cart customerCart;

	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="CUSTOMER_EMAIL_ID")
	private List<Order> orders;

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Cart getCustomerCart() {
		return customerCart;
	}

	public void setCustomerCart(Cart customerCart) {
		this.customerCart = customerCart;
	}

	public List<Order> getOrders() {
		return orders;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}
	
	
}
