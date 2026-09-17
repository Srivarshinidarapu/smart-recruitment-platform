package smart_recruitment.resume;

import jakarta.persistence.*;
import smart_recruitment.candidate.Candidate;

@Entity
@Table(name = "resumes")
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @JoinColumn(name = "candidate_id", nullable = false, unique = true)
    private Candidate candidate;

    @Column(nullable = false)
    private String fileName;

    @Column(length = 10000)
    private String extractedText;

    public Resume() {
    }

    public Resume(Candidate candidate, String fileName, String extractedText) {
        this.candidate = candidate;
        this.fileName = fileName;
        this.extractedText = extractedText;
    }

    public Long getId() {
        return id;
    }

    public Candidate getCandidate() {
        return candidate;
    }

    public void setCandidate(Candidate candidate) {
        this.candidate = candidate;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getExtractedText() {
        return extractedText;
    }

    public void setExtractedText(String extractedText) {
        this.extractedText = extractedText;
    }
}