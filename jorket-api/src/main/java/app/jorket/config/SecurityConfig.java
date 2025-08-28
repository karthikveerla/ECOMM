package app.jorket.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // default strength 10
    }
    
    // @Bean
    // public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    //     http
    //         .csrf(csrf -> csrf.disable())
    //         .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
    //         .authorizeHttpRequests(auth -> auth
    //             .requestMatchers("/api/auth/**").permitAll()           // ✅ Public signup/login
    //             .requestMatchers("/api/admin/**").hasRole("ADMIN")     // Protected by role
    //             .requestMatchers("/api/provider/**").hasRole("PROVIDER")
    //             .requestMatchers("/api/customer/**").hasRole("CUSTOMER")
    //             .requestMatchers("/products/**").permitAll() 
    //             .anyRequest().authenticated()
    //         );

    //     return http.build();
    // }
}
