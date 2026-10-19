package com.skoolix.dto.request.auth;

import com.skoolix.enums.OtpPurpose;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResendOtpRequest {
	
	@NotBlank
	private String identifier;      // email OR phone
	
	@NotNull
	private OtpPurpose purpose;
	
}