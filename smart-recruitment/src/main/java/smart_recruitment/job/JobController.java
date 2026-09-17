package smart_recruitment.job;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public JobResponse create(
            @Valid @RequestBody JobRequest request,
            Authentication authentication) {

        return jobService.create(
                request,
                authentication
        );
    }

    @GetMapping
    public List<JobResponse> findAll(
            Authentication authentication) {

        return jobService.findAll(authentication);
    }

    @PutMapping("/{jobId}/skills")
    public JobResponse addRequiredSkills(
            @PathVariable Long jobId,
            @RequestBody Set<Long> skillIds,
            Authentication authentication) {

        return jobService.addRequiredSkills(
                jobId,
                skillIds,
                authentication
        );
    }
}