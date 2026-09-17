package smart_recruitment.resume;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import smart_recruitment.candidate.Candidate;
import smart_recruitment.candidate.CandidateRepository;

import java.util.List;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.web.multipart.MultipartFile;

import smart_recruitment.skill.Skill;
import smart_recruitment.skill.SkillRepository;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Pattern;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final CandidateRepository candidateRepository;
    private final SkillRepository skillRepository;

    public ResumeService(
            ResumeRepository resumeRepository,
            CandidateRepository candidateRepository,
            SkillRepository skillRepository) {

        this.resumeRepository = resumeRepository;
        this.candidateRepository = candidateRepository;
        this.skillRepository = skillRepository;
    }

    public ResumeResponse create(ResumeRequest request) {

        Candidate candidate = candidateRepository.findById(request.getCandidateId())
                .orElseThrow(() ->
                        new RuntimeException("Candidate not found"));

        Resume resume = new Resume(
                candidate,
                request.getFileName(),
                request.getExtractedText()
        );

        Resume savedResume = resumeRepository.save(resume);

        return toResponse(savedResume);
    }

    public List<ResumeResponse> findAll() {
        return resumeRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ResumeResponse upload(
            MultipartFile file,
            Authentication authentication) throws IOException {

        String email = authentication.getName();

        Candidate candidate = candidateRepository.findByUserEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Candidate profile not found"));

        String extractedText;

        try (PDDocument document = Loader.loadPDF(file.getBytes())) {
            PDFTextStripper stripper = new PDFTextStripper();
            extractedText = stripper.getText(document);
        }

        Set<Skill> detectedSkills = new HashSet<>();

        for (Skill skill : skillRepository.findAll()) {

            String pattern = "(?i)(?<![a-z0-9])"
                    + Pattern.quote(skill.getName())
                    + "(?![a-z0-9])";

            if (Pattern.compile(pattern)
                    .matcher(extractedText)
                    .find()) {

                detectedSkills.add(skill);
            }
        }

        candidate.setSkills(detectedSkills);
        candidateRepository.save(candidate);

        Resume resume = resumeRepository.findByCandidateId(candidate.getId())
                .orElseGet(() -> new Resume(candidate, null, null));

        resume.setCandidate(candidate);
        resume.setFileName(file.getOriginalFilename());
        resume.setExtractedText(extractedText);

        Resume savedResume = resumeRepository.save(resume);


        return toResponse(savedResume);
    }

    private ResumeResponse toResponse(Resume resume) {
        return new ResumeResponse(
                resume.getId(),
                resume.getCandidate().getId(),
                resume.getFileName(),
                resume.getExtractedText()
        );
    }
}