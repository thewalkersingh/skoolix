package com.skoolix.service;

import com.skoolix.entity.Address;

import java.util.List;

public interface AddressService {
	
	List<Address> findByHouseNumber(String name);
	
	List<Address> findAllByZipCode(String zipCode);
	
	Address findById(Long id);
	
	Address findByStudentId(Long studentId);
	
	List<Address> findByParentId(Long parentId);
	
}