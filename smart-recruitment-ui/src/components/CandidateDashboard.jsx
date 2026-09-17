import { useState } from "react";
import ViewJobs from "./ViewJobs";
import MyApplications from "./MyApplications";
import ResumeUpload from "./ResumeUpload";
import MatchResults from "./MatchResults";

function CandidateDashboard({ auth }) {    const [showJobs, setShowJobs] = useState(false);
    const [showApplications, setShowApplications] = useState(false);
    const [showResume, setShowResume] = useState(false);
    const [showMatch, setShowMatch] = useState(false);

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <div>
                    <p className="dashboard-label">CANDIDATE PORTAL</p>
                    <h1>Candidate Dashboard</h1>
                    <p className="dashboard-subtitle">
                        Manage your profile, applications and job opportunities.
                    </p>
                </div>
            </div>

            <div className="dashboard-grid">
                <div
                    className="dashboard-card"
                    onClick={() => setShowJobs(!showJobs)}
                >
                    <div className="card-icon">💼</div>
                    <h3>View Jobs</h3>
                    <p>Explore available job opportunities and apply.</p>
                    <button>View Jobs</button>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() => setShowResume(!showResume)}
                >
                    <div className="card-icon">📄</div>
                    <h3>Upload Resume</h3>
                    <p>Upload your resume and automatically extract skills.</p>
                    <button>Upload Resume</button>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() => setShowApplications(!showApplications)}
                >
                    <div className="card-icon">📋</div>
                    <h3>My Applications</h3>
                    <p>Track the jobs you have applied for.</p>
                    <button>View Applications</button>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() => setShowMatch(!showMatch)}
                >
                    <div className="card-icon">🎯</div>
                    <h3>Match Results</h3>
                    <p>See how well your skills match available jobs.</p>
                    <button>View Match</button>
                </div>
            </div>

            <div className="dashboard-content">
                {showJobs && <ViewJobs auth={auth} />}
                {showResume && <ResumeUpload auth={auth} />}
                {showApplications && <MyApplications auth={auth} />}
                {showMatch && <MatchResults auth={auth} />}
            </div>
        </div>
    );
}

export default CandidateDashboard;