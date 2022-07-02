package com.barclays.store.repository;

import org.springframework.data.repository.CrudRepository;

import com.barclays.store.entity.Cart;

public interface CartRepository extends CrudRepository<Cart, Integer>{

}
