package app.jorket.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor

public class RecordEntryResponse {
    private Long id;
    private LocalDate date;
    private BigDecimal amount;
    private String category;
    private String paymentMode;
    private String type;
    private String description;
    private String receiptUrl;

}
