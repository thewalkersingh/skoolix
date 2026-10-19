package com.skoolix.mapper;

import com.skoolix.dto.request.AddressRequest;
import com.skoolix.dto.response.AddressResponse;
import com.skoolix.entity.Address;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AddressMapper {
	
	Address toEntity(AddressRequest request);
	
	AddressResponse toResponse(Address entity);
	
}