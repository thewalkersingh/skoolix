package com.skoolix.mapper;

import com.skoolix.dto.request.StaffRequest;
import com.skoolix.dto.response.StaffResponse;
import com.skoolix.entity.Staff;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {UserIdentityMapper.class, AddressMapper.class})
public interface StaffMapper {
	
	@Mapping(target = "school", ignore = true)   // set manually in service
	@Mapping(target = "createdAt", ignore = true)
	@Mapping(target = "updatedAt", ignore = true)
	Staff toEntity(StaffRequest request);
	
	@Mapping(target = "schoolId", source = "school.id")
	@Mapping(target = "schoolName", source = "school.schoolName")
	StaffResponse toResponse(Staff staff);
	
}