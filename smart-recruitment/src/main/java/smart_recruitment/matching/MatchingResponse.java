package smart_recruitment.matching;

import java.util.List;

public class MatchingResponse {

    private Long candidateId;
    private Long jobId;
    private int matchPercentage;
    private List<String> matchedSkills;
    private List<String> missingSkills;
    public MatchingResponse(Long candidateId,
                            Long jobId,
                            int matchPercentage,
                            List<String> matchedSkills,
                            List<String> missingSkills) {
        this.candidateId = candidateId;
        this.jobId = jobId;
        this.matchPercentage = matchPercentage;
        this.matchedSkills = matchedSkills;
        this.missingSkills = missingSkills;
    }

    public Long getCandidateId() {
        return candidateId;
    }

    public Long getJobId() {
        return jobId;
    }

    public int getMatchPercentage() {
        return matchPercentage;
    }

    public List<String> getMatchedSkills() {
        return matchedSkills;
    }
    public List<String> getMissingSkills() {
        return missingSkills;
    }
}