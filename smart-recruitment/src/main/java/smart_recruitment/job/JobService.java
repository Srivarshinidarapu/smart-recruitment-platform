package smart_recruitment.job;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import smart_recruitment.recruiter.Recruiter;
import smart_recruitment.recruiter.RecruiterRepository;
import smart_recruitment.skill.Skill;
import smart_recruitment.skill.SkillRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final RecruiterRepository recruiterRepository;
    private final SkillRepository skillRepository;

    public JobService(
            JobRepository jobRepository,
            RecruiterRepository recruiterRepository,
            SkillRepository skillRepository) {

        this.jobRepository = jobRepository;
        this.recruiterRepository = recruiterRepository;
        this.skillRepository = skillRepository;
    }

    public JobResponse create(
            JobRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        Recruiter recruiter = recruiterRepository.findByUserEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter profile not found"));

        Job job = new Job(
                request.getTitle(),
                request.getDescription(),
                request.getLocation(),
                request.getExperienceRequired(),
                recruiter
        );

        Job savedJob = jobRepository.save(job);

        return toResponse(savedJob);
    }

    public List<JobResponse> findAll(
            Authentication authentication) {

        String email = authentication.getName();

        boolean isRecruiter = authentication.getAuthorities()
                .stream()
                .anyMatch(authority ->
                        authority.getAuthority()
                                .equals("ROLE_RECRUITER"));

        List<Job> jobs;

        if (isRecruiter) {
            jobs = jobRepository.findByRecruiterUserEmail(email);
        } else {
            jobs = jobRepository.findAll();
        }

        return jobs.stream()
                .map(this::toResponse)
                .toList();
    }

    public JobResponse addRequiredSkills(
            Long jobId,
            Set<Long> skillIds,
            Authentication authentication) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        String email = authentication.getName();

        Recruiter recruiter = recruiterRepository
                .findByUserEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter profile not found"));

        if (!job.getRecruiter().getId().equals(recruiter.getId())) {
            throw new RuntimeException(
                    "You are not authorized to modify this job"
            );
        }

        Set<Skill> skills = skillIds.stream()
                .map(skillId -> skillRepository.findById(skillId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Skill not found: " + skillId)))
                .collect(Collectors.toSet());

        job.setRequiredSkills(skills);

        Job savedJob = jobRepository.save(job);

        return toResponse(savedJob);
    }

    private JobResponse toResponse(Job job) {

        return new JobResponse(
                job.getId(),
                job.getTitle(),
                job.getDescription(),
                job.getLocation(),
                job.getExperienceRequired(),
                job.getRecruiter().getId(),
                job.getRecruiter().getCompany(),
                job.getRequiredSkills()
        );
    }
}