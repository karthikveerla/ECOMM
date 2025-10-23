package app.jorket.services;

import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import java.util.List;
import app.jorket.dto.RecordEntryRequest;
import app.jorket.entities.CashBook;
import app.jorket.entities.RecordEntry;
import app.jorket.repositories.CashBookRepository;
import app.jorket.repositories.RecordEntryRepository;
import lombok.*;
import app.jorket.entities.enums.EntryType;
import app.jorket.entities.enums.PaymentMode;
import app.jorket.dto.RecordEntryResponse;

@Service
@RequiredArgsConstructor

public class RecordEntryService {

    private final RecordEntryRepository entryRepo;
    private final CashBookRepository bookRepo;

    public void createEntry(RecordEntryRequest request) {
        CashBook book = bookRepo.findById(request.getCashBookId())
            .orElseThrow(() -> new RuntimeException("CashBook not found"));

        RecordEntry entry = new RecordEntry();
        entry.setDate(request.getDate());
        entry.setAmount(request.getAmount());
        entry.setCategory(request.getCategory());
        entry.setPaymentMode(PaymentMode.valueOf(request.getPaymentMode().toUpperCase()));
        entry.setType(EntryType.valueOf(request.getEntryType().toUpperCase()));
        entry.setDescription(request.getDescription());
        entry.setReceiptUrl(request.getReceiptUrl());
        entry.setCashBook(book);

        entryRepo.save(entry);
    }

    public List<RecordEntryResponse> getEntriesByCashBook(Long cashBookId) {
        List<RecordEntry> entries = entryRepo.findByCashBookIdOrderByDateDesc(cashBookId);

        return entries.stream().map(entry -> new RecordEntryResponse(
            entry.getId(),
            entry.getDate(),
            entry.getAmount(),
            entry.getCategory(),
            entry.getPaymentMode().name(),
            entry.getType().name(),
            entry.getDescription(),
            entry.getReceiptUrl()
        )).collect(Collectors.toList());
    }

}

