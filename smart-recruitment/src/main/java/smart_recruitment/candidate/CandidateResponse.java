package smart_recruitment.candidate;
import smart_recruitment.skill.Skill;

import java.util.Set;
public class CandidateResponse {

    private Long id;
    private Long userId;
    private String name;
    private String email;
    private String phone;
    private String location;
    private String education;
    private Integer experience;
    private Set<Skill> skills;

    public CandidateResponse(Long id, Long userId, String name, String email,
                             String phone, String location,
                             String education, Integer experience,
                             Set<Skill> skills) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.location = location;
        this.education = education;
        this.experience = experience;
        this.skills = skills;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getLocation() {
        return location;
    }

    public String getEducation() {
        return education;
    }

    public Integer getExperience() {
        return experience;
    }
    public Set<Skill> getSkills() {
        return skills;
    }
}
