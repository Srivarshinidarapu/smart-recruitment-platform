import { useEffect, useState } from "react";

function MatchResults({ auth }) {
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadMatchResult = async () => {
            const credentials = btoa(`${auth.email}:${auth.password}`);

            try {
                const applicationsResponse = await fetch(
                    "http://localhost:8080/api/job-applications",
                    {
                        headers: {
                            Authorization: `Basic ${credentials}`,
                        },
                    }
                );

                if (!applicationsResponse.ok) {
                    throw new Error("Failed to load applications");
                }

                const applications =
                    await applicationsResponse.json();

                if (applications.length === 0) {
                    setError(
                        "Apply to a job to view your match result."
                    );
                    return;
                }

                const jobId = applications[0].jobId;

                const matchResponse = await fetch(
                    `http://localhost:8080/api/matching/candidate/${applications[0].candidateId}/job/${jobId}`,
                    {
                        headers: {
                            Authorization: `Basic ${credentials}`,
                        },
                    }
                );

                if (!matchResponse.ok) {
                    throw new Error("Failed to load match result");
                }

                const matchData = await matchResponse.json();

                setResult(matchData);
            } catch (err) {
                console.error(err);
                setError(err.message);
            }
        };

        loadMatchResult();
    }, [auth.email, auth.password]);

    if (error) {
        return (
            <div className="match-error">
                <h3>Unable to load match result</h3>
                <p>{error}</p>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="match-loading">
                <p>Analyzing your skills...</p>
            </div>
        );
    }

    return (
        <div className="match-section">
            <div className="section-heading">
                <div>
                    <p className="section-label match-label">
                        AI SKILL ANALYSIS
                    </p>

                    <h2>Job Match Result</h2>

                    <p>
                        See how closely your skills match the job
                        requirements.
                    </p>
                </div>

                <div className="match-job">
                    Job #{result.jobId}
                </div>
            </div>

            <div className="match-main-card">
                <div className="match-score-area">
                    <div className="score-circle">
                        <span className="score-number">
                            {result.matchPercentage}%
                        </span>
                        <span className="score-label">MATCH</span>
                    </div>

                    <div className="score-info">
                        <h3>Skill Match Score</h3>

                        <p>
                            Your profile matches{" "}
                            <strong>
                                {result.matchPercentage}%
                            </strong>{" "}
                            of the required skills for this job.
                        </p>
                    </div>
                </div>

                <div className="match-divider"></div>

                <div className="skills-columns">
                    <div className="skill-column">
                        <h3>
                            <span className="skill-dot matched-dot"></span>
                            Matched Skills
                        </h3>

                        <div className="result-skill-list">
                            {result.matchedSkills.length > 0 ? (
                                result.matchedSkills.map((skill) => (
                                    <span
                                        className="result-skill matched-skill"
                                        key={skill}
                                    >
                                        ✓ {skill}
                                    </span>
                                ))
                            ) : (
                                <p>No matched skills</p>
                            )}
                        </div>
                    </div>

                    <div className="skill-column">
                        <h3>
                            <span className="skill-dot missing-dot"></span>
                            Missing Skills
                        </h3>

                        <div className="result-skill-list">
                            {result.missingSkills.length > 0 ? (
                                result.missingSkills.map((skill) => (
                                    <span
                                        className="result-skill missing-skill"
                                        key={skill}
                                    >
                                        + {skill}
                                    </span>
                                ))
                            ) : (
                                <p>No missing skills</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MatchResults;