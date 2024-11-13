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
        "http://localhost:2000/api/auth/createuser",
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
        navigate("/");
      } else {
        alert("These credentials already exist.");
      }
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  
  
};

export default Signup;