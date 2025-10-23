package app.jorket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import app.jorket.entities.RecordEntry;
import java.util.List;

public interface RecordEntryRepository extends JpaRepository<RecordEntry, Long> {
    List<RecordEntry> findByCashBookId(Long cashBookId);
    List<RecordEntry> findByCashBookIdOrderByDateDesc(Long cashBookId);

}
