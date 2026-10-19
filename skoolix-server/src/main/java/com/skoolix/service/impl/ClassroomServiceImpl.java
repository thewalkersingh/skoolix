package com.skoolix.service.impl;

import com.skoolix.dto.request.ClassroomRequest;
import com.skoolix.dto.response.ClassroomResponse;
import com.skoolix.entity.Classroom;
import com.skoolix.entity.School;
import com.skoolix.enums.ClassroomStatus;
import com.skoolix.exception.ResourceNotFoundException;
import com.skoolix.mapper.ClassroomMapper;
import com.skoolix.repository.ClassroomRepository;
import com.skoolix.repository.SchoolRepository;
import com.skoolix.service.ClassroomService;
import com.skoolix.wrapper.PageResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ClassroomServiceImpl implements ClassroomService {
	
	private final ClassroomRepository classroomRepository;
	private final ClassroomMapper classroomMapper;
	private final SchoolRepository schoolRepository;
	
	public ClassroomResponse createClassroom(Long schoolId, ClassroomRequest request) {
		
		Classroom classroom = classroomMapper.toEntity(request);
		School school = schoolRepository
								 .findById(schoolId)
								 .orElseThrow(() -> new RuntimeException("School not found"));
		classroom.setSchool(school);
		classroom = classroomRepository.save(classroom);
		return classroomMapper.toResponse(classroom);
	}
	
	public ClassroomResponse updateClassroom(Long classroomId, ClassroomRequest request) {
		
		classroomRepository.findById(classroomId)
								 .orElseThrow(() -> new ResourceNotFoundException("Classroom not found"));
		Classroom classroom = classroomMapper.toEntity(request);
		Classroom response = classroomRepository.save(classroom);
		return classroomMapper.toResponse(response);
	}
	
	public void deleteClassroom(Long classroomId) {
		
		classroomRepository.findById(classroomId).ifPresent(classroomRepository::delete);
	}
	
	// ── Single fetch ──────────────────────────────────────────────────────────
	public ClassroomResponse getClassroom(Long id) {
		
		return classroomRepository.findById(id)
										  .map(classroomMapper::toResponse)
										  .orElseThrow(() -> new RuntimeException("Classroom not found"));
	}
	
	public ClassroomResponse getClassroomByCode(String classroomCode) {
		
		Classroom classroom = classroomRepository
										 .findByClassroomCode(classroomCode)
										 .orElseThrow(() -> new ResourceNotFoundException("Classroom not found"));
		return classroomMapper.toResponse(classroom);
		
	}
	
	public PageResponse<ClassroomResponse> getAllClassrooms(Pageable pageable) {
		
		Page<Classroom> page = classroomRepository.findAll(pageable);
		List<ClassroomResponse> data = page.getContent().stream().map(classroomMapper::toResponse).toList();
		return PageResponse.<ClassroomResponse>builder()
								 .data(data)
								 .page(page.getNumber())
								 .size(page.getSize())
								 .totalElements(page.getTotalElements())
								 .totalPages(page.getTotalPages())
								 .hasNext(page.hasNext())
								 .hasPrevious(page.hasPrevious())
								 .build();
	}
	
	public PageResponse<ClassroomResponse> getClassroomsBySchool(Long schoolId, Pageable pageable) {
		
		Page<Classroom> page = classroomRepository.findBySchoolId(schoolId, pageable);
		List<ClassroomResponse> data = page.getContent().stream().map(classroomMapper::toResponse).toList();
		return PageResponse.<ClassroomResponse>builder()
								 .data(data)
								 .page(page.getNumber())
								 .size(page.getSize())
								 .totalElements(page.getTotalElements())
								 .totalPages(page.getTotalPages())
								 .hasNext(page.hasNext())
								 .hasPrevious(page.hasPrevious())
								 .build();
	}
	
	public PageResponse<ClassroomResponse> getClassroomsBySchoolAndStatus(Long schoolId, ClassroomStatus status,
		Pageable pageable) {
		
		Page<Classroom> page = classroomRepository.findBySchoolIdAndClassroomStatus(schoolId, status, pageable);
		List<ClassroomResponse> data = page.getContent().stream().map(classroomMapper::toResponse).toList();
		return PageResponse.<ClassroomResponse>builder()
								 .data(data)
								 .page(page.getNumber())
								 .size(page.getSize())
								 .totalElements(page.getTotalElements())
								 .totalPages(page.getTotalPages())
								 .hasNext(page.hasNext())
								 .hasPrevious(page.hasPrevious())
								 .build();
	}
	
	// ── Status management ─────────────────────────────────────────────────────
	public ClassroomResponse updateStatus(Long classroomId, ClassroomStatus status) {
		
		Classroom classroom = classroomRepository.findById(classroomId)
															  .orElseThrow(() -> new ResourceNotFoundException("Classroom not " +
																																	"found"));
		classroom.setClassroomStatus(status);
		classroom = classroomRepository.save(classroom);
		return classroomMapper.toResponse(classroom);
	}
	
}