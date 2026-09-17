package smart_recruitment.jobapplication;

public class JobApplicationResponse {

    private Long id;
    private Long candidateId;
    private String candidateName;
    private Long jobId;
    private String jobTitle;
    private ApplicationStatus status;

    public JobApplicationResponse(Long id,
                                  Long candidateId,
                                  String candidateName,
                                  Long jobId,
                                  String jobTitle,
                                  ApplicationStatus status) {
        this.id = id;
        this.candidateId = candidateId;
        this.candidateName = candidateName;
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public Long getCandidateId() {
        return candidateId;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public Long getJobId() {
        return jobId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public ApplicationStatus getStatus() {
        return status;
    }
}