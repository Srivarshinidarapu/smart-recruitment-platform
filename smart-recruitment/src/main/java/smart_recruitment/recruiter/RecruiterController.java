package smart_recruitment.recruiter;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recruiters")
public class RecruiterController {

    private final RecruiterService recruiterService;

    public RecruiterController(RecruiterService recruiterService) {
        this.recruiterService = recruiterService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RecruiterResponse create(@Valid @RequestBody RecruiterRequest request) {
        return recruiterService.create(request);
    }

    @GetMapping
    public List<RecruiterResponse> findAll() {
        return recruiterService.findAll();
    }
}