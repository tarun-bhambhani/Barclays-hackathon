package com.barclays.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.barclays.store.entity.Product;


public interface ProductRepository extends JpaRepository<Product, Integer> {

}
