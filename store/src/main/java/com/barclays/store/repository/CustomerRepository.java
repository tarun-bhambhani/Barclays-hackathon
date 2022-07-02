package com.barclays.store.repository;

import org.springframework.data.repository.CrudRepository;

import com.barclays.store.entity.Customer;

public interface CustomerRepository extends CrudRepository<Customer, Integer>{

}
