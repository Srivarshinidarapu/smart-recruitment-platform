package smart_recruitment.recruiter;

import jakarta.validation.constraints.NotNull;

public class RecruiterRequest {

    @NotNull(message = "User ID is required")
    private Long userId;

    private String company;
    private String designation;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }
}