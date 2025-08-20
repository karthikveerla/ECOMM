package app.jorket.entities;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "JORKET_USERS")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(name = "FULL_NAME")
    private String fullName;

    @Column(nullable = false)
    private Integer enabled = 1;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "JORKET_USER_ROLES",
        joinColumns = @JoinColumn(name = "USER_ID"),
        inverseJoinColumns = @JoinColumn(name = "ROLE_ID")
    )
    private Set<Role> roles = new HashSet<>();

    // Constructors
    public User() {}

    public User(Long id, String email, String password, String fullName, Integer enabled, Set<Role> roles) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.enabled = enabled;
        this.roles = roles;
    }

    // Getters & setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public String getFullName() { return fullName; }

    public void setFullName(String fullName) { this.fullName = fullName; }

    public Integer getEnabled() { return enabled; }

    public void setEnabled(Integer enabled) { this.enabled = enabled; }

    public Set<Role> getRoles() { return roles; }

    public void setRoles(Set<Role> roles) { this.roles = roles; }

    @Override
    public String toString() {
        return "User{id=" + id + ", email='" + email + "', fullName='" + fullName + "'}";
    }
}
