package com.skoolix.service;

public interface SmsService {
	
	public void init();
	
	void sendOtp(String toPhone, String otp);
	
}