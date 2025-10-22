package app.jorket.entities;
import app.jorket.converters.YearMonthConverter;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;  



import lombok.NoArgsConstructor;

import lombok.AllArgsConstructor;
import lombok.Data;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class CashBook {
    @Id 
    @SequenceGenerator(
    name = "cash_book_seq",
    sequenceName = "cash_book_seq",
    allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cash_book_seq")
    private Long id;

    private String title;

    @Column(name = "month", length = 10)
    @Convert(converter = YearMonthConverter.class)
    private YearMonth month;

    private LocalDateTime createdAt;

    @ManyToOne
    private User owner;

    @OneToMany(mappedBy = "cashBook", cascade = CascadeType.ALL)
    private List<RecordEntry> entries = new ArrayList<>();

}
