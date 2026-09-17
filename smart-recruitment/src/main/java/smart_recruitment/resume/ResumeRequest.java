package smart_recruitment.resume;

import jakarta.validation.constraints.NotNull;

public class ResumeRequest {

    @NotNull(message = "Candidate ID is required")
    private Long candidateId;

    private String fileName;
    private String extractedText;

    public Long getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(Long candidateId) {
        this.candidateId = candidateId;
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