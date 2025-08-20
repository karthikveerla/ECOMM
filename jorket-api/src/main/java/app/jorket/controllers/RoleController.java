package app.jorket.controllers;

import app.jorket.entities.Role;
import app.jorket.repositories.RoleRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RoleRepository roleRepo;

    public RoleController(RoleRepository roleRepo) {
        this.roleRepo = roleRepo;
    }

    @GetMapping
    public List<Role> getAllRoles() {
        return roleRepo.findAll();
    }
}
