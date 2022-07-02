package com.barclays.store.repository;

import org.springframework.data.repository.CrudRepository;

import com.barclays.store.entity.Order;


public interface OrderRepository extends CrudRepository<Order, Integer>{

}
