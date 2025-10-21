package app.jorket.converters;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.time.YearMonth;

@Converter(autoApply = true)
public class YearMonthConverter implements AttributeConverter<YearMonth, String> {

    // Convert entity attribute to DB column (YearMonth -> String)
    @Override
    public String convertToDatabaseColumn(YearMonth attribute) {
        return (attribute != null) ? attribute.toString() : null; 
        // Example: YearMonth.of(2025, 10) -> "2025-10"
    }

    // Convert DB column to entity attribute (String -> YearMonth)
    @Override
    public YearMonth convertToEntityAttribute(String dbData) {
        return (dbData != null) ? YearMonth.parse(dbData) : null;
        // Example: "2025-10" -> YearMonth.of(2025, 10)
    }
}
