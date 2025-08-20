package app.jorket.services;

import app.jorket.dto.AuthResponse;
import app.jorket.dto.LoginRequest;
import app.jorket.dto.SignupRequest;
import app.jorket.entities.Role;
import app.jorket.entities.User;
import app.jorket.repositories.RoleRepository;
import app.jorket.repositories.UserRepository;
import app.jorket.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // Sign up logic
    public void registerUser(SignupRequest request) {
        if (userRepo.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already registered");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        Set<Role> roles = request.getRoles().stream()
                .map(roleName -> roleRepo.findByName(roleName)
                        .orElseThrow(() -> new RuntimeException("Invalid role: " + roleName)))
                .collect(Collectors.toSet());

        user.setRoles(roles);
        userRepo.save(user);
    }

    // Login logic
    public AuthResponse login(LoginRequest request) {
        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(user);

        return new AuthResponse(
                token,
                null, // optional refreshToken support
                user.getEmail(),
                user.getRoles().stream().map(Role::getName).collect(Collectors.toSet())
        );
    }
}
