package app.jorket.dto;

import java.util.Set;

public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private String email;
    private Set<String> roles;

    public AuthResponse() {}

    public AuthResponse(String accessToken, String refreshToken, String email, Set<String> roles) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.email = email;
        this.roles = roles;
    }

    // Getters & setters
    public String getAccessToken() { return accessToken; }
    public void setAccessToken(String accessToken) { this.accessToken = accessToken; }

    public String getRefreshToken() { return refreshToken; }
    public void setRefreshToken(String refreshToken) { this.refreshToken = refreshToken; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Set<String> getRoles() { return roles; }
    public void setRoles(Set<String> roles) { this.roles = roles; }
}
