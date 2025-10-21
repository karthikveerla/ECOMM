package app.jorket.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recordsubmissions")
@Getter 
@Setter @NoArgsConstructor @AllArgsConstructor
public class Submission{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;   // example text field
    private String description; // example text field

    @Lob
    @Column(name = "document_file")
    private byte[] documentFile;

    @Lob
    @Column(name = "image_file")
    private byte[] imageFile;
}

