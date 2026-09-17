package smart_recruitment.candidate;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class CandidateRequest {

    @NotNull(message = "User ID is required")
    private Long userId;

    private String phone;

    private String location;

    private String education;

    @Min(value = 0, message = "Experience cannot be negative")
    private Integer experience;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public Integer getExperience() {
        return experience;
    }

    public void setExperience(Integer experience) {
        this.experience = experience;
    }
}