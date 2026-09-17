import { useState } from "react";

function ResumeUpload({ auth }) {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage("Please select a PDF resume");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        const credentials = btoa(`${auth.email}:${auth.password}`);

        try {
            const response = await fetch(
                "http://localhost:8080/api/resumes/upload",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Basic ${credentials}`,
                    },
                    body: formData,
                }
            );

            if (response.ok) {
                setMessage("Resume uploaded successfully");
            } else {
                setMessage("Failed to upload resume");
            }
        } catch (error) {
            console.error(error);
            setMessage("Unable to connect to backend");
        }
    };

    return (
        <div className="resume-section">
            <div className="section-heading">
                <div>
                    <p className="section-label">PROFILE DOCUMENT</p>
                    <h2>Upload Resume</h2>
                    <p>
                        Upload your resume to automatically extract your
                        skills.
                    </p>
                </div>
            </div>

            <div className="resume-upload-card">
                <div className="resume-icon">📄</div>

                <h3>Upload your resume</h3>

                <p>
                    Choose your latest resume in PDF format.
                    <br />
                    Your skills will be automatically detected.
                </p>

                <form onSubmit={handleUpload}>
                    <label className="file-upload-area">
                        <span className="upload-cloud">☁️</span>

                        <span className="upload-title">
                            {file
                                ? file.name
                                : "Click to choose your resume"}
                        </span>

                        <span className="upload-hint">
                            PDF files only
                        </span>

                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => {
                                setFile(e.target.files[0]);
                                setMessage("");
                            }}
                        />
                    </label>

                    <button
                        type="submit"
                        className="resume-upload-button"
                    >
                        Upload Resume →
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

export default ResumeUpload;