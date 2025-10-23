package app.jorket.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class CashBookSummaryResponse {
    private Long id;
    private String title;
    private String month;       // e.g., "2025-10"
    private BigDecimal netTotal;
    private LocalDateTime updatedAt;
}

