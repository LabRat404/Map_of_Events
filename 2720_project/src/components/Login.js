import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchLSCD from '../hooks/Fetch.js'

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
          alert("Login successful");
          fetchLSCD();
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
          alert("Login failed, please enter your credentials again.");
          document.getElementById('login_form').reset();
        }
      });
  }
  return (
    <div className="Auth-form-container">
      <form className="form-control Auth-form" id="login_form" onSubmit={handleSubmit}>
      <div className="Auth-form-title">Welcome to Map of Events</div>
        <div className="mb-3">
          <label className="Auth-form-content">Username</label>
          <input
            className="form-control"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="Auth-form-content">Password</label>
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
    </div>
  );
}

export default Login;