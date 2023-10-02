import React, { useEffect } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/organisms/LoginForm";
import { TweetForm } from "./components/organisms/TweetForm";

const PrivateRoute = ({ children }: { children: any }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return <LoginForm />;
  }

  return children;
};

const RedirectToLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return null;
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RedirectToLogin />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/tweet"
            element={
              <PrivateRoute>
                <TweetForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
