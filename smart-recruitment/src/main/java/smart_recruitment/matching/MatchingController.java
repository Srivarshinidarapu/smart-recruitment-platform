package smart_recruitment.matching;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/matching")
public class MatchingController {

    private final MatchingService matchingService;

    public MatchingController(MatchingService matchingService) {
        this.matchingService = matchingService;
    }

    @GetMapping("/candidate/{candidateId}/job/{jobId}")
    public MatchingResponse calculateMatch(
            @PathVariable Long candidateId,
            @PathVariable Long jobId,
            Authentication authentication) {

        return matchingService.calculateMatch(
                candidateId,
                jobId,
                authentication
        );
    }
}