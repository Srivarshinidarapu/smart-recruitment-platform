import { useState } from "react";
import PostJob from "./PostJob";
import MyJobs from "./MyJobs";
import ViewApplications from "./ViewApplications";
import ViewMatchScores from "./ViewMatchScores";

function RecruiterDashboard({ auth }) {    const [showPostJob, setShowPostJob] = useState(false);
    const [showMyJobs, setShowMyJobs] = useState(false);
    const [showApplications, setShowApplications] = useState(false);
    const [showMatchScores, setShowMatchScores] = useState(false);

    return (
        <div className="dashboard-page recruiter-dashboard">
            <div className="dashboard-header">
                <div>
                    <p className="dashboard-label">RECRUITER PORTAL</p>

                    <h1>Recruiter Dashboard</h1>

                    <p className="dashboard-subtitle">
                        Manage jobs, applications and candidate talent.
                    </p>
                </div>
            </div>

            <div className="dashboard-grid">
                <div
                    className="dashboard-card"
                    onClick={() => setShowPostJob(!showPostJob)}
                >
                    <div className="card-icon">➕</div>

                    <h3>Post a Job</h3>

                    <p>
                        Create new job opportunities and define your hiring
                        requirements.
                    </p>

                    <button>Post Job</button>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() => setShowMyJobs(!showMyJobs)}
                >
                    <div className="card-icon">💼</div>

                    <h3>My Jobs</h3>

                    <p>
                        View the jobs you have posted and manage your openings.
                    </p>

                    <button>View Jobs</button>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() =>
                        setShowApplications(!showApplications)
                    }
                >
                    <div className="card-icon">📋</div>

                    <h3>Applications</h3>

                    <p>
                        Review candidates who have applied to your jobs.
                    </p>

                    <button>View Applications</button>
                </div>

                <div
                    className="dashboard-card recruiter-match-card"
                    onClick={() =>
                        setShowMatchScores(!showMatchScores)
                    }
                >
                    <div className="card-icon">🎯</div>

                    <h3>Match Scores</h3>

                    <p>
                        Compare candidate skills against your job requirements.
                    </p>

                    <button>View Match Scores</button>
                </div>
            </div>

            <div className="dashboard-content">
                {showPostJob && <PostJob auth={auth} />}
                {showMyJobs && <MyJobs auth={auth} />}
                {showApplications && <ViewApplications auth={auth} />}
                {showMatchScores && <ViewMatchScores auth={auth} />}
            </div>
        </div>
    );
}

export default RecruiterDashboard;