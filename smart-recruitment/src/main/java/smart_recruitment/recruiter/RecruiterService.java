package smart_recruitment.recruiter;

import org.springframework.stereotype.Service;
import smart_recruitment.user.User;
import smart_recruitment.user.UserRepository;

import java.util.List;

@Service
public class RecruiterService {

    private final RecruiterRepository recruiterRepository;
    private final UserRepository userRepository;

    public RecruiterService(RecruiterRepository recruiterRepository,
                            UserRepository userRepository) {
        this.recruiterRepository = recruiterRepository;
        this.userRepository = userRepository;
    }

    public RecruiterResponse create(RecruiterRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Recruiter recruiter = new Recruiter(
                user,
                request.getCompany(),
                request.getDesignation()
        );

        Recruiter savedRecruiter = recruiterRepository.save(recruiter);

        return toResponse(savedRecruiter);
    }

    public List<RecruiterResponse> findAll() {
        return recruiterRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private RecruiterResponse toResponse(Recruiter recruiter) {
        return new RecruiterResponse(
                recruiter.getId(),
                recruiter.getUser().getId(),
                recruiter.getUser().getName(),
                recruiter.getUser().getEmail(),
                recruiter.getCompany(),
                recruiter.getDesignation()
        );
    }
}