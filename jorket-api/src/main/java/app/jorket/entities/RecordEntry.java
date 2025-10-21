package app.jorket.entities;

import java.math.BigDecimal;
import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class RecordEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "entry_date") // ✅ Avoid Oracle keyword "DATE"
    private LocalDate date;

    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "entry_type") // ✅ Avoid keyword "TYPE"
    private EntryType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_mode")
    private PaymentMode paymentMode;

    private String category;
    private String description;
    private String receiptUrl;

    @ManyToOne
    @JoinColumn(name = "cash_book_id")
    private CashBook cashBook;
}
