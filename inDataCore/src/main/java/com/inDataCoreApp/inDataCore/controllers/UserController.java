package com.inDataCoreApp.inDataCore.controllers;

import com.inDataCoreApp.inDataCore.dto.Logindto;
import com.inDataCoreApp.inDataCore.dto.RegisterUtilisateurDto;
import com.inDataCoreApp.inDataCore.dto.ResponseLoginDto;
import com.inDataCoreApp.inDataCore.entities.Utilisateur;
import com.inDataCoreApp.inDataCore.jwt.JwtTokenUtil;
import com.inDataCoreApp.inDataCore.repositories.UserRepositorie;
import com.inDataCoreApp.inDataCore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepositorie userRepositorie;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtTokenUtil jwtTokenUtil;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Logindto request) {
        System.out.println("Received Login Request: " + request.getEmail() + ", " + request.getPassword());
        try {
            Authentication authentication = this.authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Utilisateur utilisateur = userRepositorie.findByEmail(userDetails.getUsername());

            String accessToken = this.jwtTokenUtil.generateAccessToken(utilisateur);
            ResponseLoginDto authenticationResponse = new ResponseLoginDto(utilisateur.getEmail(), accessToken);
            return ResponseEntity.status(HttpStatus.OK).body(authenticationResponse);
        } catch (BadCredentialsException badCredentialsException) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }



    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterUtilisateurDto registerUtilisateurDto) {
        if (userService.existsByEmail(registerUtilisateurDto.getEmail())) {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Utilisateur newUtilisateur = new Utilisateur();
        newUtilisateur.setFirstName(registerUtilisateurDto.getFirstName());
        newUtilisateur.setLastName(registerUtilisateurDto.getLastName());
        newUtilisateur.setEmail(registerUtilisateurDto.getEmail());
        BCryptPasswordEncoder bCryptPasswordEncoder=new BCryptPasswordEncoder();
        String password=bCryptPasswordEncoder.encode(registerUtilisateurDto.getPassword());
        newUtilisateur.setPassword(password);
        userService.createUser(newUtilisateur);
        return ResponseEntity.status(HttpStatus.OK).build();

    }

    @GetMapping("/utilisateurs")
    @ResponseBody
    public List<Utilisateur> getUsers(){
        return userService.getAllusers();
    }
    @GetMapping("/user-details/{id}")
    public ResponseEntity<?> getUserDetails(@PathVariable("id") Long id) {
        try {

            Utilisateur utilisateur = userRepositorie.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("utilisateur existe"));

            return ResponseEntity.ok(utilisateur);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("erreur");
        }
    }


}
