package com.inDataCoreApp.inDataCore.service;

import com.inDataCoreApp.inDataCore.entities.Utilisateur;
import com.inDataCoreApp.inDataCore.repositories.UserRepositorie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IServiceUser{
    @Autowired
    private UserRepositorie userRepositorie;

    @Override
    public Utilisateur createUser(Utilisateur utilisateur) {
        return userRepositorie.save(utilisateur);
    }
  @Override
    public  boolean existsByEmail(String email){
      return userRepositorie.existsByEmail(email);
  }

    @Override
    public boolean existsByPassword(String password) {
        return userRepositorie.existsByPassword(password);
    }

    @Override
    public List<Utilisateur> getAllusers() {
        return userRepositorie.findAll();
    }





}
