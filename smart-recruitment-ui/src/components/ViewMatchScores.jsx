import { useEffect, useState } from "react";

function ViewMatchScores({ auth }) {
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadMatchScores = async () => {
            const credentials = btoa(`${auth.email}:${auth.password}`);

            try {
                const applicationsResponse = await fetch(
                    "https://independent-success-production-4bb8.up.railway.app/api/job-applications",
                    {
                        headers: {
                            Authorization: `Basic ${credentials}`,
                        },
                    }
                );

                if (!applicationsResponse.ok) {
                    throw new Error("Failed to load applications");
                }

                const applications = await applicationsResponse.json();

                const matchResults = await Promise.all(
                    applications.map(async (application) => {
                        const response = await fetch(
                            `https://independent-success-production-4bb8.up.railway.app/api/matching/candidate/${application.candidateId}/job/${application.jobId}`,
                            {
                                headers: {
                                    Authorization: `Basic ${credentials}`,
                                },
                            }
                        );

                        if (!response.ok) {
                            throw new Error("Failed to load match score");
                        }

                        const matchData = await response.json();

                        return {
                            applicationId: application.id,
                            ...matchData,
                        };
                    })
                );

                setResults(matchResults);
            } catch (error) {
                console.error(error);
                setError(error.message);
            }
        };

        loadMatchScores();
    }, [auth.email, auth.password]);

    if (error) {
        return (
            <section className="section-card">
                <div className="section-heading">
                    <div>
                        <p className="section-label">MATCH ANALYSIS</p>
                        <h2>Candidate Match Scores</h2>
                    </div>
                </div>

                <div className="error-message">
                    {error}
                </div>
            </section>
        );
    }

    return (
        <section className="section-card">
            <div className="section-heading">
                <div>
                    <p className="section-label">AI-POWERED SCREENING</p>

                    <h2>Candidate Match Scores</h2>

                    <p>
                        Compare candidate skills against job requirements
                        using automated matching analysis.
                    </p>
                </div>

                <div className="section-count">
                    {results.length}{" "}
                    {results.length === 1
                        ? "Candidate"
                        : "Candidates"}
                </div>
            </div>

            {results.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">🎯</div>

                    <h3>No Match Results</h3>

                    <p>
                        Match results will appear here when candidates
                        apply for your jobs.
                    </p>
                </div>
            ) : (
                <div className="match-scores-grid">
                    {results.map((result) => {
                        const score = result.matchPercentage;

                        return (
                            <div
                                className="recruiter-match-card-item"
                                key={result.applicationId}
                            >
                                <div className="match-card-header">
                                    <div>
                                        <span className="application-badge">
                                            Application #{result.applicationId}
                                        </span>

                                        <h3>
                                            Candidate #{result.candidateId}
                                        </h3>
                                    </div>

                                    <div className="match-score-circle">
                                        <span>{score}%</span>
                                        <small>Match</small>
                                    </div>
                                </div>

                                <div className="match-card-info">
                                    <div className="info-item">
                                        <span>Job ID</span>
                                        <strong>{result.jobId}</strong>
                                    </div>

                                    <div className="info-item">
                                        <span>Match Score</span>
                                        <strong>{score}%</strong>
                                    </div>
                                </div>

                                <div className="skill-analysis">
                                    <div className="skill-group">
                                        <h4>
                                            <span className="skill-dot matched-dot"></span>
                                            Matched Skills
                                        </h4>

                                        <div className="skill-tags">
                                            {result.matchedSkills.length > 0 ? (
                                                result.matchedSkills.map(
                                                    (skill) => (
                                                        <span
                                                            className="skill-tag matched-tag"
                                                            key={skill}
                                                        >
                                                            ✓ {skill}
                                                        </span>
                                                    )
                                                )
                                            ) : (
                                                <span className="no-skills">
                                                    No matched skills
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="skill-group">
                                        <h4>
                                            <span className="skill-dot missing-dot"></span>
                                            Missing Skills
                                        </h4>

                                        <div className="skill-tags">
                                            {result.missingSkills.length > 0 ? (
                                                result.missingSkills.map(
                                                    (skill) => (
                                                        <span
                                                            className="skill-tag missing-tag"
                                                            key={skill}
                                                        >
                                                            + {skill}
                                                        </span>
                                                    )
                                                )
                                            ) : (
                                                <span className="no-skills">
                                                    No missing skills
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

export default ViewMatchScores;