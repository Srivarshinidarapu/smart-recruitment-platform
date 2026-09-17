package smart_recruitment.matching;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import smart_recruitment.candidate.Candidate;
import smart_recruitment.candidate.CandidateRepository;
import smart_recruitment.job.Job;
import smart_recruitment.job.JobRepository;
import smart_recruitment.recruiter.Recruiter;
import smart_recruitment.recruiter.RecruiterRepository;
import smart_recruitment.skill.Skill;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MatchingService {

    private final CandidateRepository candidateRepository;
    private final JobRepository jobRepository;
    private final RecruiterRepository recruiterRepository;

    public MatchingService(
            CandidateRepository candidateRepository,
            JobRepository jobRepository,
            RecruiterRepository recruiterRepository) {

        this.candidateRepository = candidateRepository;
        this.jobRepository = jobRepository;
        this.recruiterRepository = recruiterRepository;
    }

    public MatchingResponse calculateMatch(
            Long candidateId,
            Long jobId,
            Authentication authentication) {

        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() ->
                        new RuntimeException("Candidate not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        boolean isRecruiter = authentication.getAuthorities()
                .stream()
                .anyMatch(authority ->
                        authority.getAuthority()
                                .equals("ROLE_RECRUITER"));

        if (isRecruiter) {

            String email = authentication.getName();

            Recruiter recruiter = recruiterRepository
                    .findByUserEmail(email)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Recruiter profile not found"));

            if (!job.getRecruiter().getId()
                    .equals(recruiter.getId())) {

                throw new RuntimeException(
                        "You are not authorized to view this match");
            }

        } else {

            String email = authentication.getName();

            Candidate loggedInCandidate =
                    candidateRepository.findByUserEmail(email)
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Candidate profile not found"));

            if (!loggedInCandidate.getId()
                    .equals(candidateId)) {

                throw new RuntimeException(
                        "You are not authorized to view this match");
            }
        }

        Set<String> candidateSkills = candidate.getSkills()
                .stream()
                .map(skill -> skill.getName().toLowerCase())
                .collect(Collectors.toSet());

        List<String> matchedSkills = job.getRequiredSkills()
                .stream()
                .map(Skill::getName)
                .filter(skillName ->
                        candidateSkills.contains(
                                skillName.toLowerCase()))
                .toList();

        List<String> missingSkills = job.getRequiredSkills()
                .stream()
                .map(Skill::getName)
                .filter(skillName ->
                        !candidateSkills.contains(
                                skillName.toLowerCase()))
                .toList();

        int totalRequiredSkills =
                job.getRequiredSkills().size();

        int matchPercentage = totalRequiredSkills == 0
                ? 0
                : (matchedSkills.size() * 100)
                  / totalRequiredSkills;

        return new MatchingResponse(
                candidateId,
                jobId,
                matchPercentage,
                matchedSkills,
                missingSkills
        );
    }
}