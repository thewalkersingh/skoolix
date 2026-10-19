package com.skoolix.mapper;

import com.skoolix.dto.request.ClassroomRequest;
import com.skoolix.dto.response.ClassroomResponse;
import com.skoolix.entity.Classroom;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ClassroomMapper {
	
	Classroom toEntity(ClassroomRequest request);
	
	ClassroomResponse toResponse(Classroom classroom);
	
}