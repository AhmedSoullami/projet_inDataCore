package com.inDataCoreApp.inDataCore.jwt;

import com.inDataCoreApp.inDataCore.entities.Utilisateur;
import io.jsonwebtoken.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


import java.util.Date;
@Component
@Data
@NoArgsConstructor
@AllArgsConstructor

public class JwtTokenUtil {
    private static final long EXPIRE_DURATION = 120000L;
    @Value("${app.jwt.secret}")

    private String SECRET_KEY;

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtTokenUtil.class);



    public String generateAccessToken(Utilisateur user) {
        return Jwts.builder().setSubject(String.format("%s,%s", user.getIdUser(),
                user.getEmail()))
                .setIssuer("CodeJava")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 120000L))
                .signWith(SignatureAlgorithm.HS512, this.SECRET_KEY).compact();
    }
    public boolean validateAccessToken(String token) {
        try {
            Jwts.parser().setSigningKey(this.SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException var3) {
            LOGGER.error("JWT expired", var3.getMessage());
        } catch (IllegalArgumentException var4) {
            LOGGER.error("Token is null, empty or only whitespace", var4.getMessage());
        } catch (MalformedJwtException var5) {
            LOGGER.error("JWT is invalid", var5);
        } catch (UnsupportedJwtException var6) {
            LOGGER.error("JWT is not supported", var6);
        } catch (SignatureException var7) {
            LOGGER.error("Signature validation failed");
        }

        return false;
    }
    public String getSubject(String token) {
        return this.parseClaims(token).getSubject();
    }

    private Claims parseClaims(String token) {
        return (Claims)Jwts.parser().setSigningKey(this.SECRET_KEY).parseClaimsJws(token).getBody();
    }
}
