package smart_recruitment.candidate;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    private final CandidateService candidateService;

    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CandidateResponse create(@Valid @RequestBody CandidateRequest request) {
        return candidateService.create(request);
    }

    @GetMapping
    public List<CandidateResponse> findAll() {
        return candidateService.findAll();
    }

    @PutMapping("/{candidateId}/skills")
    public CandidateResponse addSkills(
            @PathVariable Long candidateId,
            @RequestBody Set<Long> skillIds) {

        return candidateService.addSkills(candidateId, skillIds);
    }
}