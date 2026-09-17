package smart_recruitment.job;
import smart_recruitment.skill.Skill;
import java.util.Set;
public class JobResponse {

    private Long id;
    private String title;
    private String description;
    private String location;
    private String experienceRequired;
    private Long recruiterId;
    private String company;
    private Set<Skill> requiredSkills;
    public JobResponse(Long id, String title, String description,
                       String location, String experienceRequired,
                       Long recruiterId, String company,
                       Set<Skill> requiredSkills) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.experienceRequired = experienceRequired;
        this.recruiterId = recruiterId;
        this.company = company;
        this.requiredSkills = requiredSkills;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getLocation() {
        return location;
    }

    public String getExperienceRequired() {
        return experienceRequired;
    }

    public Long getRecruiterId() {
        return recruiterId;
    }

    public String getCompany() {
        return company;
    }
    public Set<Skill> getRequiredSkills() {
        return requiredSkills;
    }
}