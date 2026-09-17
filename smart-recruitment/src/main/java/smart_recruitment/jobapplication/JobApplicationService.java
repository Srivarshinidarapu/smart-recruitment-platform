package smart_recruitment.jobapplication;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import smart_recruitment.candidate.Candidate;
import smart_recruitment.candidate.CandidateRepository;
import smart_recruitment.job.Job;
import smart_recruitment.job.JobRepository;

import java.util.List;

@Service
public class JobApplicationService {

    private final JobApplicationRepository applicationRepository;
    private final CandidateRepository candidateRepository;
    private final JobRepository jobRepository;

    public JobApplicationService(
            JobApplicationRepository applicationRepository,
            CandidateRepository candidateRepository,
            JobRepository jobRepository) {

        this.applicationRepository = applicationRepository;
        this.candidateRepository = candidateRepository;
        this.jobRepository = jobRepository;
    }

    public JobApplicationResponse create(
            JobApplicationRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        Candidate candidate = candidateRepository.findByUserEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Candidate profile not found"));

        Job job = jobRepository.findById(request.getJobId())
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        JobApplication application = new JobApplication(
                candidate,
                job,
                ApplicationStatus.APPLIED
        );

        JobApplication savedApplication =
                applicationRepository.save(application);

        return toResponse(savedApplication);
    }

    public List<JobApplicationResponse> findAll(
            Authentication authentication) {

        String email = authentication.getName();

        boolean isRecruiter = authentication.getAuthorities()
                .stream()
                .anyMatch(authority ->
                        authority.getAuthority().equals("ROLE_RECRUITER"));

        if (isRecruiter) {
            return applicationRepository
                    .findByJobRecruiterUserEmail(email)
                    .stream()
                    .map(this::toResponse)
                    .toList();
        }

        return applicationRepository
                .findByCandidateUserEmail(email)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private JobApplicationResponse toResponse(
            JobApplication application) {

        return new JobApplicationResponse(
                application.getId(),
                application.getCandidate().getId(),
                application.getCandidate().getUser().getName(),
                application.getJob().getId(),
                application.getJob().getTitle(),
                application.getStatus()
        );
    }
}