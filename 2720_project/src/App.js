import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Preferences from './components/Preference';
import Login from './components/Login';
import EventDetails from './components/EventDetails';

function App() {
  /** 
  const navigate = useNavigate();
  if (window.localStorage.getItem("token")) {
    if (window.localStorage.getItem("admin") == "true") {
      navigate("/Preference");
    } else {
      navigate("/Dashboard");
    }
  } else {
    navigate("/");
  }
  */
  return (
    <div className="wrapper">
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />}>
            <Route path="fav/:vName" element={<EventDetails />}/>
          </Route>
          <Route path="/Preference" element={<Preferences />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;