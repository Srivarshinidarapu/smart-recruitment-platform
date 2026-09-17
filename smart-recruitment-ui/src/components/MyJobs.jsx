import { useEffect, useState } from "react";

function MyJobs({ auth }) {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const credentials = btoa(`${auth.email}:${auth.password}`);
        fetch("http://localhost:8080/api/jobs", {
            headers: {
                Authorization: `Basic ${credentials}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setJobs(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="my-jobs-section">
            <div className="section-heading">
                <div>
                    <p className="section-label">HIRING MANAGEMENT</p>
                    <h2>My Jobs</h2>
                    <p>
                        Manage the job opportunities you have posted.
                    </p>
                </div>

                <span className="job-count">
                    {jobs.length} {jobs.length === 1 ? "Job" : "Jobs"}
                </span>
            </div>

            {jobs.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">💼</div>
                    <h3>No jobs found</h3>
                    <p>Post a job to start receiving applications.</p>
                </div>
            ) : (
                <div className="recruiter-jobs-grid">
                    {jobs.map((job) => (
                        <div className="recruiter-job-card" key={job.id}>
                            <div className="recruiter-job-header">
                                <div className="company-icon">S</div>

                                <div>
                                    <h3>{job.title}</h3>
                                    <span className="job-id">
                                        Job ID #{job.id}
                                    </span>
                                </div>
                            </div>

                            <div className="recruiter-job-meta">
                                <span>📍 {job.location}</span>
                                <span>💼 {job.experienceRequired}</span>
                            </div>

                            <div className="recruiter-description">
                                <p>{job.description}</p>
                            </div>

                            <div className="job-status">
                                <span className="active-dot"></span>
                                Active Job
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyJobs;