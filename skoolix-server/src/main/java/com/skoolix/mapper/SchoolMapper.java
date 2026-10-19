package com.skoolix.mapper;

import com.skoolix.dto.request.SchoolRequest;
import com.skoolix.dto.response.SchoolResponse;
import com.skoolix.entity.School;
import org.mapstruct.Mapper;

@Mapper(
	 componentModel = "spring",
	 uses = {TeacherMapper.class, ClassroomMapper.class})
public interface SchoolMapper {
	
	School toEntity(SchoolRequest request);
	
	SchoolResponse toResponse(School school);
	
}