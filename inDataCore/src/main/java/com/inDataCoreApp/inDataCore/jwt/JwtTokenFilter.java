package com.inDataCoreApp.inDataCore.jwt;

import com.inDataCoreApp.inDataCore.entities.Utilisateur;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
@Component
@NoArgsConstructor
@AllArgsConstructor
@Data
public class JwtTokenFilter extends OncePerRequestFilter{
   @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (!this.hasAuthorizationBearer(request)) {
            filterChain.doFilter(request, response);
        } else {
            String token = this.getAccessToken(request);
            if (!this.jwtTokenUtil.validateAccessToken(token)) {
                filterChain.doFilter(request, response);
            } else {
                this.setAuthenticationContext(token, request);
                filterChain.doFilter(request, response);
            }
        }
    }
    private boolean hasAuthorizationBearer(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        return !ObjectUtils.isEmpty(header) && header.startsWith("Bearer");
    }

    private String getAccessToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        String token = header.split(" ")[1].trim();
        return token;
    }
    private void setAuthenticationContext(String token, HttpServletRequest request) {
        UserDetails userDetails = this.getUserDetails(token);
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, (Object)null, (Collection)null);
        authentication.setDetails((new WebAuthenticationDetailsSource()).buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
    private UserDetails getUserDetails(String token) {
        Utilisateur userDetails = new Utilisateur();
        String[] jwtSubject = this.jwtTokenUtil.getSubject(token).split(",");
        userDetails.setIdUser(Long.parseLong(jwtSubject[0]));
        userDetails.setEmail(jwtSubject[1]);
        return (UserDetails) userDetails;
    }

}
