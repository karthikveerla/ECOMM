package app.jorket.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import app.jorket.dto.CashBookRequest;
import app.jorket.services.CashBookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/cashbook")
@RequiredArgsConstructor


public class CashBookController {
    private final CashBookService cashBookService;

    @PostMapping("/create")
    public ResponseEntity<String> createBook(@RequestBody CashBookRequest request,
                                             @RequestHeader("userId") Long userId) {
        cashBookService.createCashBook(request, userId);
        return ResponseEntity.status(201).body("CashBook created successfully");
    }

}
