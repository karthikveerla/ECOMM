package app.jorket.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RecordEntryRequest {
    private Long cashBookId;
    private LocalDate date;
    private BigDecimal amount;
    private String category;
    private String paymentMode; // "CASH" or "CARD"
    private String entryType;        // "CASH_IN" or "CASH_OUT"
    private String description;
    private String receiptUrl;  // Optional: path to uploaded image
}
