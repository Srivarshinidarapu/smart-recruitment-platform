import { useEffect, useState } from "react";

function ViewJobs({ auth }) {
    const [jobs, setJobs] = useState([]);

    const credentials = btoa(`${auth.email}:${auth.password}`);

    useEffect(() => {
        fetch("http://localhost:8080/api/jobs", {
            headers: {
                Authorization: `Basic ${credentials}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load jobs");
                }
                return response.json();
            })
            .then((data) => {
                setJobs(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [auth.email, auth.password]);

    const applyToJob = async (jobId) => {
        try {
            const response = await fetch(
                "http://localhost:8080/api/job-applications",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Basic ${credentials}`,
                    },
                    body: JSON.stringify({
                        jobId: jobId,
                    }),
                }
            );

            if (response.ok) {
                alert("Application submitted successfully");
            } else {
                const errorText = await response.text();
                console.error(errorText);
                alert("Failed to apply");
            }
        } catch (error) {
            console.error(error);
            alert("Unable to connect to backend");
        }
    };

    return (
        <div className="jobs-section">
            <div className="section-heading">
                <div>
                    <p className="section-label">OPPORTUNITIES</p>
                    <h2>Available Jobs</h2>
                    <p>
                        Discover opportunities that match your skills and
                        experience.
                    </p>
                </div>

                <span className="job-count">
                    {jobs.length} {jobs.length === 1 ? "Job" : "Jobs"}
                </span>
            </div>

            {jobs.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">💼</div>
                    <h3>No jobs available</h3>
                    <p>New opportunities will appear here.</p>
                </div>
            ) : (
                <div className="jobs-grid">
                    {jobs.map((job) => (
                        <div className="job-card" key={job.id}>
                            <div className="job-card-top">
                                <div className="company-icon">S</div>

                                <div>
                                    <h3>{job.title}</h3>
                                    <p className="company-name">
                                        Smart Recruitment
                                    </p>
                                </div>
                            </div>

                            <div className="job-meta">
                                <span>📍 {job.location}</span>
                                <span>💼 {job.experienceRequired}</span>
                            </div>

                            <p className="job-description">
                                {job.description}
                            </p>

                            {job.requiredSkills &&
                                job.requiredSkills.length > 0 && (
                                    <div className="skills-section">
                                        <p className="skills-title">
                                            Required Skills
                                        </p>

                                        <div className="skill-list">
                                            {job.requiredSkills.map(
                                                (skill) => (
                                                    <span
                                                        className="skill-badge"
                                                        key={skill.id}
                                                    >
                                                        {skill.name}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                            <button
                                className="apply-button"
                                onClick={() => applyToJob(job.id)}
                            >
                                Apply Now →
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ViewJobs;