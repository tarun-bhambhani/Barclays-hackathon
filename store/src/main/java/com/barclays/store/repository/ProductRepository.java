package com.barclays.store.repository;

import org.springframework.data.repository.CrudRepository;

import com.barclays.store.entity.Product;


public interface ProductRepository extends CrudRepository<Product, Integer>{

}
