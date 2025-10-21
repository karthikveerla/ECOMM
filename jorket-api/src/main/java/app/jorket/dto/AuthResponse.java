package app.jorket.dto;


public class AuthResponse {
    private String accessToken;
    // private String refreshToken;
    private String email;

    public AuthResponse() {}

    public AuthResponse(String accessToken, String email) {
        this.accessToken = accessToken;
        // this.refreshToken = refreshToken;
        this.email = email;
    }

    // Getters & setters
    public String getAccessToken() { return accessToken; }
    public void setAccessToken(String accessToken) { this.accessToken = accessToken; }

    // public String getRefreshToken() { return refreshToken; }
    // public void setRefreshToken(String refreshToken) { this.refreshToken = refreshToken; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
