package app.jorket.dto;

import lombok.Setter;
import lombok.Getter;


@Setter
@Getter
public class SignupRequest {
    private String email;
    private String password;
    private String fullName;
}
