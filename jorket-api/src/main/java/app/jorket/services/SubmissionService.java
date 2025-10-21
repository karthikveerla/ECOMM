
package app.jorket.services;
import org.springframework.web.multipart.MultipartFile;
import app.jorket.entities.Submission;
import app.jorket.repositories.SubmissionRepository;


import org.springframework.stereotype.Service;

@Service
public class SubmissionService {
    private final SubmissionRepository repo;

    public SubmissionService(SubmissionRepository repo) {
        this.repo = repo;
    }

    public Submission saveRecord(String title, String description,
                                   MultipartFile document, MultipartFile image) throws Exception {
        Submission record = new Submission();
        record.setTitle(title);
        record.setDescription(description);
        record.setDocumentFile(document.getBytes());
        record.setImageFile(image.getBytes());
        return repo.save(record);
    }
}
