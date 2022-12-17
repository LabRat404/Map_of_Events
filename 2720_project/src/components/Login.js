import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login (props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleSubmit = (e) => {

    e.preventDefault();
    fetch("http://localhost:3001/login-user", {
      method: "POST",
      redirect: 'follow',
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("admin", data.adminFlag);
          if (window.localStorage.getItem("token")) {
            if (window.localStorage.getItem("admin") == "true") {
              navigate("/Preference");
            } else {
              navigate("/Dashboard");
            }
          } else {
            navigate("/");
          }
        } else {
          alert("login failed")
        }
      });
  }
  return (
    <form className="form-control" onSubmit={handleSubmit}>
      <h3>Sign In</h3>
      <div className="mb-3">
        <label>Username</label>
        <input
          className="form-control"
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}

export default Login;