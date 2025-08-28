package app.jorket.repositories;

import app.jorket.entities.StaffMember;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface StaffRepository extends JpaRepository<StaffMember, UUID> {
}