package com.skoolix.dto.response;

import com.skoolix.dto.common.StaffSummary;
import com.skoolix.enums.Department;
import com.skoolix.enums.StaffRole;
import com.skoolix.enums.StaffStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StaffResponse {
	
	private StaffStatus status;
	private Department department;
	private StaffRole staffRole;
	private Long schoolId;
	private String schoolName;
	private StaffSummary staffSummary;
	private LocalDate joiningDate;
	private String photoUrl;
	private AddressResponse address;
	private UserIdentityResponse identity;
	
}