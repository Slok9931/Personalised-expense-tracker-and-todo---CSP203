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
  
  
};

export default Signup;