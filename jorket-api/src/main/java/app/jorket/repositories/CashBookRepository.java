package app.jorket.repositories;

import app.jorket.entities.CashBook;
import app.jorket.entities.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CashBookRepository extends JpaRepository<CashBook, Long> {
    boolean existsByTitleAndOwner(String title, User owner);
    List<CashBook> findByOwnerIdOrderByMonthDesc(Long userId);

}
