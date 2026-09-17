package smart_recruitment.candidate;

import org.springframework.stereotype.Service;
import smart_recruitment.user.User;
import smart_recruitment.user.UserRepository;

import java.util.List;
import smart_recruitment.skill.Skill;
import smart_recruitment.skill.SkillRepository;

import java.util.Set;
import java.util.stream.Collectors;
@Service
public class CandidateService {

    private final CandidateRepository candidateRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    public CandidateService(CandidateRepository candidateRepository,
                            UserRepository userRepository,
                            SkillRepository skillRepository) {
        this.candidateRepository = candidateRepository;
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;

    }

    public CandidateResponse create(CandidateRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Candidate candidate = new Candidate(
                user,
                request.getPhone(),
                request.getLocation(),
                request.getEducation(),
                request.getExperience()
        );

        Candidate savedCandidate = candidateRepository.save(candidate);

        return toResponse(savedCandidate);
    }

    public List<CandidateResponse> findAll() {
        return candidateRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private CandidateResponse toResponse(Candidate candidate) {
        return new CandidateResponse(
                candidate.getId(),
                candidate.getUser().getId(),
                candidate.getUser().getName(),
                candidate.getUser().getEmail(),
                candidate.getPhone(),
                candidate.getLocation(),
                candidate.getEducation(),
                candidate.getExperience(),
                candidate.getSkills()
        );
    }
    public CandidateResponse addSkills(Long candidateId, Set<Long> skillIds) {

        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        Set<Skill> skills = skillIds.stream()
                .map(skillId -> skillRepository.findById(skillId)
                        .orElseThrow(() -> new RuntimeException("Skill not found: " + skillId)))
                .collect(Collectors.toSet());

        candidate.setSkills(skills);

        Candidate savedCandidate = candidateRepository.save(candidate);

        return toResponse(savedCandidate);
    }
}