import { useState } from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import CandidateDashboard from "./components/CandidateDashboard";
import RecruiterDashboard from "./components/RecruiterDashboard";

function App() {
  const [auth, setAuth] = useState({
    loggedIn: false,
    email: "",
    password: "",
    role: "",
  });

  const handleLogin = async (email, password) => {
    const credentials = btoa(`${email}:${password}`);

    try {
      const response = await fetch(
          "https://independent-success-production-4bb8.up.railway.app/api/users/me",
          {
            headers: {
              Authorization: `Basic ${credentials}`,
            },
          }
      );

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const user = await response.json();

      setAuth({
        loggedIn: true,
        email: user.email,
        password,
        role: user.role,
      });

    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  };

  const handleLogout = () => {
    setAuth({
      loggedIn: false,
      email: "",
      password: "",
      role: "",
    });
  };

  if (!auth.loggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
      <div>
        <Navbar
            email={auth.email}
            role={auth.role}
            onLogout={handleLogout}
        />

        {auth.role === "RECRUITER" ? (
            <RecruiterDashboard auth={auth} />
        ) : (
            <CandidateDashboard auth={auth} />
        )}
      </div>
  );
}

export default App;