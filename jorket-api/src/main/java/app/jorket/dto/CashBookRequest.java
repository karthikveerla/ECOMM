package app.jorket.dto;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CashBookRequest {
    private String title;
    private Integer year;
    private Integer month;
    private Long userId;
}
