import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [icon, setIcon] = useState("visibility_off");
  const [view, setView] = useState("password");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:2000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/transaction");
    } else {
      alert("Invalid Credentials");
    }
  };
  
  const show = () => {
    if (icon === "visibility_off") {
      setIcon("visibility");
      setView("text");
    } else {
      setIcon("visibility_off");
      setView("password");
    }
  };
  
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="main">
      <div className="signup1">
        <img src="/logo1.jpg" alt="Header" height="150" className="logo-signup" ></img>
        <h2 className="welcome">Welcome back</h2>
        <div className="welcome">Log in to access your secure expenses & tasks.</div>
      </div>
      <div className="signup2">
        <form onSubmit={handleSubmit}>
          <div className="email">
            <label htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              className="input"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              required
              onChange={onChange}
            />
            <div id="emailHelp">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="email">
            <label htmlFor="password">
              Password
            </label>
            <div className="password">
              <input
                type={view}
                className="input"
                id="password"
                name="password"
                required
                onChange={onChange}
              />
              <span
                className="material-symbols-outlined password2"
                onClick={show}
              >
                {icon}
              </span>
            </div>
          </div>
          <div className="btns">
            <button type="submit" className="btn">
              Login
            </button>
            <span
              className="link"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
