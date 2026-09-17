package smart_recruitment.jobapplication;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-applications")
public class JobApplicationController {

    private final JobApplicationService applicationService;

    public JobApplicationController(JobApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public JobApplicationResponse create(
            @Valid @RequestBody JobApplicationRequest request,
            Authentication authentication) {

        return applicationService.create(
                request,
                authentication
        );
    }

    @GetMapping
    public List<JobApplicationResponse> findAll(
            Authentication authentication) {

        return applicationService.findAll(authentication);
    }
}