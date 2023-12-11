package com.inDataCoreApp.inDataCore.repositories;

import com.inDataCoreApp.inDataCore.entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepositorie extends JpaRepository<Utilisateur,Long> {
    boolean existsByEmail(String email);

    boolean existsByPassword(String password);

    Utilisateur findByEmail(String email);
}
