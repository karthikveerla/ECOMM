package app.jorket.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "JORKET_ROLES")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String name;

    // Constructors
    public Role() {}

    public Role(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    // Getters & setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    @Override
    public String toString() {
        return "Role{id=" + id + ", name='" + name + "'}";
    }
}
