import { useEffect, useState } from "react";

function ViewApplications({ auth }) {    const [applications, setApplications] = useState([]);
    const [error, setError] = useState("");

    const credentials = btoa(`${auth.email}:${auth.password}`);
    useEffect(() => {
        fetch("https://independent-success-production-4bb8.up.railway.app/api/job-applications", {
            headers: {
                Authorization: `Basic ${credentials}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load applications");
                }
                return response.json();
            })
            .then((data) => setApplications(data))
            .catch((error) => setError(error.message));
    }, []);

    const getStatusClass = (status) => {
        if (status === "SHORTLISTED") return "status-shortlisted";
        if (status === "REJECTED") return "status-rejected";
        return "status-applied";
    };

    if (error) {
        return (
            <div className="recruiter-error">
                <h3>Unable to load applications</h3>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="recruiter-applications-section">
            <div className="section-heading">
                <div>
                    <p className="section-label">CANDIDATE MANAGEMENT</p>
                    <h2>Job Applications</h2>
                    <p>
                        Review candidates who have applied to your job
                        openings.
                    </p>
                </div>

                <span className="job-count">
                    {applications.length}{" "}
                    {applications.length === 1
                        ? "Application"
                        : "Applications"}
                </span>
            </div>

            {applications.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📋</div>
                    <h3>No applications found</h3>
                    <p>
                        Candidate applications will appear here.
                    </p>
                </div>
            ) : (
                <div className="recruiter-applications-list">
                    {applications.map((application) => (
                        <div
                            className="recruiter-application-card"
                            key={application.id}
                        >
                            <div className="candidate-avatar">
                                C
                            </div>

                            <div className="candidate-info">
                                <h3>
                                    Candidate #{application.candidateId}
                                </h3>

                                <p>
                                    Application #{application.id}
                                </p>

                                <div className="application-meta">
                                    <span>
                                        💼 Job #{application.jobId}
                                    </span>
                                </div>
                            </div>

                            <div className="application-status-area">
                                <span
                                    className={`status-badge ${getStatusClass(
                                        application.status
                                    )}`}
                                >
                                    {application.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ViewApplications;