import { useState } from "react";

function PostJob({ auth }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        experienceRequired: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = btoa(`${auth.email}:${auth.password}`);
        try {
            const response = await fetch("http://localhost:8080/api/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${credentials}`,
                },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                setMessage("Job posted successfully");
            } else {
                setMessage("Failed to post job");
            }
        } catch {
            setMessage("Unable to connect to backend");
        }
    };

    return (
        <div className="post-job-section">
            <div className="section-heading">
                <div>
                    <p className="section-label">HIRING MANAGEMENT</p>
                    <h2>Post a Job</h2>
                    <p>
                        Create a new opportunity and find candidates with the
                        right skills.
                    </p>
                </div>
            </div>

            <div className="job-form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="styled-form-group">
                            <label>Job Title</label>
                            <input
                                name="title"
                                placeholder="e.g. Java Backend Developer"
                                value={form.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="styled-form-group">
                            <label>Location</label>
                            <input
                                name="location"
                                placeholder="e.g. Hyderabad"
                                value={form.location}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="styled-form-group">
                        <label>Job Description</label>
                        <textarea
                            name="description"
                            placeholder="Describe the role, responsibilities and requirements..."
                            value={form.description}
                            onChange={handleChange}
                            rows="6"
                            required
                        />
                    </div>

                    <div className="styled-form-group">
                        <label>Experience Required</label>
                        <input
                            name="experienceRequired"
                            placeholder="e.g. 0-2 years"
                            value={form.experienceRequired}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="post-job-button">
                        Publish Job →
                    </button>
                </form>

                {message && (
                    <p
                        className={
                            message.includes("successfully")
                                ? "upload-success"
                                : "upload-error"
                        }
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default PostJob;