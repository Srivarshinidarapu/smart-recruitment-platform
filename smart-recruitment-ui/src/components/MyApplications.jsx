import { useEffect, useState } from "react";

function MyApplications({ auth }) {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const credentials = btoa(`${auth.email}:${auth.password}`);

        fetch("http://localhost:8080/api/job-applications", {
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
            .then((data) => {
                setApplications(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [auth.email, auth.password]);

    const getStatusClass = (status) => {
        if (status === "SHORTLISTED") return "status-shortlisted";
        if (status === "REJECTED") return "status-rejected";
        return "status-applied";
    };

    return (
        <div className="applications-section">
            <div className="section-heading">
                <div>
                    <p className="section-label">APPLICATION TRACKER</p>
                    <h2>My Applications</h2>
                    <p>
                        Track the status of jobs you have applied for.
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
                    <h3>No applications yet</h3>
                    <p>
                        Apply to a job and your application will appear here.
                    </p>
                </div>
            ) : (
                <div className="applications-list">
                    {applications.map((application) => (
                        <div
                            className="application-card"
                            key={application.id}
                        >
                            <div className="application-icon">💼</div>

                            <div className="application-details">
                                <h3>
                                    {application.jobTitle ||
                                        `Job #${application.jobId}`}
                                </h3>

                                <p>
                                    Application ID:{" "}
                                    <strong>#{application.id}</strong>
                                </p>
                            </div>

                            <div className="application-status">
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

export default MyApplications;