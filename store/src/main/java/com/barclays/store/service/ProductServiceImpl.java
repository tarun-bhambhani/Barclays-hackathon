package com.barclays.store.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barclays.store.dto.ProductDTO;
import com.barclays.store.entity.Product;
import com.barclays.store.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService{

	@Autowired
	ProductRepository productRepository;
	
	@Autowired
	ModelMapper modelMapper;
	
	@Override
	public ProductDTO getProductDetails(Integer productId) {
		// TODO Auto-generated method stub
		Optional<Product> op = productRepository.findById(productId);
		ProductDTO pDto = null;
		if (op.isPresent()){
			 pDto = modelMapper.map(op.get(), ProductDTO.class);
		}
		return pDto;
	}

	@Override
	public List<ProductDTO> getAllProducts() {
		// TODO Auto-generated method stub
		List<Product> products = productRepository.findAll();
		List<ProductDTO> productDtos = new ArrayList();
		products.forEach(product -> {
			productDtos.add(modelMapper.map(product, ProductDTO.class));
		});
		return productDtos;
	}
	
}
