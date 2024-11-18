import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [icon, setIcon] = useState("visibility_off");
  const [view, setView] = useState("password");
  const [credentials, setCredentials] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const show = () => {
    if (icon === "visibility_off") {
      setIcon("visibility");
      setView("text");
    } else {
      setIcon("visibility_off");
      setView("password");
    }
  };
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, cpassword } = credentials;
    if (cpassword !== password) {
      alert("Please enter correct password");
    } else {
      const response = await fetch(
        `http://localhost:2000/api/auth/createuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials.username,
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/transaction");
      } else {
        alert("These credentials already exist.");
      }
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="main">
      <div className="signup1">
        <img src="/logo1.jpg" alt="Header" height="250" className="logo-signup"></img>
        <h2 className="welcome">Welcome to</h2>
        <h2 className="welcome">Trackify!</h2>
        <div className="welcome">Your expenses & tasks are secured.</div>
      </div>
      <div className="signup2">
        <form onSubmit={handleSubmit}>
          <div className="email">
            <label htmlFor="name">
              Name
            </label>
            <input
              type="text"
              className="input"
              id="name"
              name="name"
              aria-describedby="emailHelp"
              onChange={onChange}
              required
            />
          </div>
          <div className="email">
            <label htmlFor="username">
              Username
            </label>
            <input
              type="text"
              className="input"
              id="username"
              name="username"
              aria-describedby="emailHelp"
              onChange={onChange}
              required
            />
          </div>
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
              onChange={onChange}
              required
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
              minLength={3}
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
          <div className="email">
            <label htmlFor="cpassword">
              Confirm Password
            </label>
            <input
              type="password"
              className="input"
              id="cpassword"
              name="cpassword"
              minLength={3}
              required
              onChange={onChange}
            />
          </div>

          <div className="btns">
            <button type="submit" className="btn">
              Sign Up
            </button>
            <span
              className="link"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
