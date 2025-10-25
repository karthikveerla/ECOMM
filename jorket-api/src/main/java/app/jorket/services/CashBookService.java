package app.jorket.services;
import app.jorket.dto.CashBookRequest;
import app.jorket.dto.CashBookSummaryResponse;
import app.jorket.entities.CashBook;
import app.jorket.entities.User;
import app.jorket.entities.enums.EntryType;
import app.jorket.repositories.CashBookRepository;
import app.jorket.repositories.RecordEntryRepository;
import app.jorket.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CashBookService {

    private final CashBookRepository cashBookRepo;
    private final UserRepository userRepo; // Assuming you fetch user from token/session
    private final RecordEntryRepository entryRepo;

    public void createCashBook(CashBookRequest request, Long userId) {
        User user = userRepo.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (cashBookRepo.existsByTitleAndOwner(request.getTitle(), user)) {
            throw new RuntimeException("CashBook already exists for this month");
        }

        CashBook book = new CashBook();
        book.setTitle(request.getTitle());
        book.setMonth(YearMonth.of(request.getYear(), request.getMonth()));
        book.setCreatedAt(LocalDateTime.now());
        book.setOwner(user);

        cashBookRepo.save(book);
    }

    public List<CashBookSummaryResponse> getCashBooksForUser(Long userId) {
        List<CashBook> books = cashBookRepo.findByOwnerIdOrderByMonthDesc(userId);

        return books.stream().map(book -> {
            BigDecimal netTotal = book.getEntries().stream()
                .map(entry -> entry.getType() == EntryType.CASH_IN
                        ? entry.getAmount()
                        : entry.getAmount().negate())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

            return new CashBookSummaryResponse(
                book.getId(),
                book.getTitle(),
                book.getMonth().toString(), // e.g., "2025-10"
                netTotal,
                book.getCreatedAt()
            );
        }).collect(Collectors.toList());
    }

    public void deleteCashBookById(Long id) {
        if (!cashBookRepo.existsById(id)) {
            throw new IllegalArgumentException("CashBook not found with id: " + id);
        }

        entryRepo.deleteByCashBookId(id);
        
        cashBookRepo.deleteById(id);
    }

}

