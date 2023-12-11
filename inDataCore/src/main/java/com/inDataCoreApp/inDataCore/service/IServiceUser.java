package com.inDataCoreApp.inDataCore.service;

import com.inDataCoreApp.inDataCore.entities.Utilisateur;

import java.util.List;
import java.util.Optional;

public interface IServiceUser {
    Utilisateur createUser(Utilisateur utilisateur);
    boolean existsByEmail(String email);
    boolean existsByPassword(String password);
    List<Utilisateur> getAllusers();



}
