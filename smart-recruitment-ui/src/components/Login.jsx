import { useState } from "react";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        const credentials = btoa(`${email}:${password}`);

        try {
            const response = await fetch(
                "https://independent-success-production-4bb8.up.railway.app/api/candidates",
                {
                    headers: {
                        Authorization: `Basic ${credentials}`,
                    },
                }
            );

            if (!response.ok) {
                setError("Invalid email or password");
                return;
            }

            onLogin(email, password);
        } catch (err) {
            setError("Unable to connect to backend");
        }
    };

    return (
        <div className="login-page">
            <div className="login-left">
                <div className="brand-section">
                    <div className="brand-icon">S</div>
                    <h1>Smart Recruitment</h1>
                    <p>
                        Find the right opportunities.
                        <br />
                        Find the right talent.
                    </p>
                </div>
            </div>

            <div className="login-right">
                <div className="login-card">
                    <h2>Welcome back</h2>
                    <p className="login-subtitle">
                        Sign in to continue to your account
                    </p>

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <button type="submit" className="login-button">
                            Sign In
                        </button>
                    </form>

                    <p className="login-footer">
                        Smart Recruitment Platform
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;