package com.skoolix.security;

import com.skoolix.entity.User;
import com.skoolix.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
	
	private final JwtUtil jwtUtil;
	private final UserRepository userRepository;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response,
		@NonNull FilterChain filterChain) throws ServletException, IOException {
		
		final String authHeader = request.getHeader("Authorization");
		log.debug("Auth header: {}", authHeader);
		
		// ── No token — pass through (public endpoints handled by Security config)
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			log.debug("No Bearer token found — skipping filter");
			filterChain.doFilter(request, response);
			return;
		}
		
		final String token = authHeader.substring(7);   // strip "Bearer "
		log.debug("Token extracted, length: {}", token.length());
		
		try {
			// ── Extract userId from token claims
			Long userId = jwtUtil.extractUserId(token);
			log.debug("Extracted userId: {}", userId);
			
			// ── Only process if not already authenticated
			if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
				User user = userRepository.findByIdWithIdentity(userId).orElse(null);
				
				if (user != null && jwtUtil.isTokenValid(token, user)) {
					CustomUserDetails userDetails = new CustomUserDetails(user);
					log.debug("Authorities: {}", userDetails.getAuthorities());
					
					// ── Build authentication token
					UsernamePasswordAuthenticationToken authToken =
						new UsernamePasswordAuthenticationToken(userDetails,
							null,                           // no credentials needed post-auth
							userDetails.getAuthorities());
					
					authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					
					// ── Set in security context — request is now authenticated
					SecurityContextHolder.getContext().setAuthentication(authToken);
				}
			}
			
		} catch (Exception e) {
			// ── Invalid token — log and continue without setting auth
			// Security config will handle the 401 response
			log.warn("JWT validation failed for request {}: {}", request.getRequestURI(), e.getMessage());
		}
		
		filterChain.doFilter(request, response);
	}
	
	// ── Skip filter for auth endpoints — no token needed there
	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) {
		
		String path = request.getServletPath();
		
		return PUBLIC_ENDPOINTS.stream()
									  .anyMatch(path::startsWith);
	}
	
	private static final List<String> PUBLIC_ENDPOINTS = List.of(
		"/v1/auth/login",
		"/v1/auth/register",
		"/v1/auth/verify-otp",
		"/v1/auth/refresh",
		"/v1/auth/forgot-password",
		"/v1/auth/resend-otp"
	);
	
}