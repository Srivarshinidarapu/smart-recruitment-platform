package smart_recruitment.recruiter;

public class RecruiterResponse {

    private Long id;
    private Long userId;
    private String name;
    private String email;
    private String company;
    private String designation;

    public RecruiterResponse(Long id, Long userId, String name, String email,
                             String company, String designation) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.company = company;
        this.designation = designation;
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

    public String getCompany() {
        return company;
    }

    public String getDesignation() {
        return designation;
    }
}