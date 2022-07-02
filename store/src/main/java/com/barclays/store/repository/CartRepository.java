package com.barclays.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.barclays.store.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer> {

}
