package com.barclays.store.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Cart {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer cartId;
	
	@OneToOne(cascade=CascadeType.DETACH)
	@JoinColumn(name="product_id")
	private Product product;

	private Integer quantity;
	
	public Integer getCartId() {
		return cartId;
	}

	public void setCartId(Integer cartId) {
		this.cartId = cartId;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
}
