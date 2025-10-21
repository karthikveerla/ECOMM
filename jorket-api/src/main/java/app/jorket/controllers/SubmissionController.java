package app.jorket.controllers;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import app.jorket.services.SubmissionService;
import app.jorket.entities.Submission;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/api/records")
public class SubmissionController {
    private final SubmissionService service;

    public SubmissionController(SubmissionService service) {
        this.service = service;
    }

    @PostMapping("/upload")
    public ResponseEntity<Submission> uploadRecord(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("document") MultipartFile document,
            @RequestParam("image") MultipartFile image) throws Exception {
        return ResponseEntity.ok(service.saveRecord(title, description, document, image));
    }
}
