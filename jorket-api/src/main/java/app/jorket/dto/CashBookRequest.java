package app.jorket.dto;
import lombok.Setter;
import lombok.Getter;

@Getter
@Setter

public class CashBookRequest {
    private String title;
    private Integer year;
    private Integer month;
    private Long userId;
}
