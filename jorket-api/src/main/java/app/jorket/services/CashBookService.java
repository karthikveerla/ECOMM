package app.jorket.services;
import app.jorket.dto.CashBookRequest;
import app.jorket.entities.CashBook;
import app.jorket.entities.User;
import app.jorket.repositories.CashBookRepository;
import app.jorket.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.YearMonth;

@Service
@RequiredArgsConstructor
public class CashBookService {

    private final CashBookRepository cashBookRepo;
    private final UserRepository userRepo; // Assuming you fetch user from token/session

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
}

