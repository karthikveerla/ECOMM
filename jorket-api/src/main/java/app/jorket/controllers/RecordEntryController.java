package app.jorket.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.jorket.dto.RecordEntryRequest;
import app.jorket.services.RecordEntryService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/record")
@RequiredArgsConstructor
public class RecordEntryController {

    private final RecordEntryService entryService;

    @PostMapping("/create")
    public ResponseEntity<String> createEntry(@RequestBody RecordEntryRequest request) {
        entryService.createEntry(request);
        return ResponseEntity.status(201).body("Entry created successfully");
    }
}
