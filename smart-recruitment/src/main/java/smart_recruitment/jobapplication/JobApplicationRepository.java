package smart_recruitment.jobapplication;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByCandidateUserEmail(String email);

    List<JobApplication> findByJobRecruiterUserEmail(String email);
}