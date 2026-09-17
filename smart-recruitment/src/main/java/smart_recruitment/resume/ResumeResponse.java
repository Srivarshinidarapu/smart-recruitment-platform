package smart_recruitment.resume;

public class ResumeResponse {

    private Long id;
    private Long candidateId;
    private String fileName;
    private String extractedText;

    public ResumeResponse(Long id, Long candidateId,
                          String fileName, String extractedText) {
        this.id = id;
        this.candidateId = candidateId;
        this.fileName = fileName;
        this.extractedText = extractedText;
    }

    public Long getId() {
        return id;
    }

    public Long getCandidateId() {
        return candidateId;
    }

    public String getFileName() {
        return fileName;
    }

    public String getExtractedText() {
        return extractedText;
    }
}