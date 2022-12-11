import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Preferences from './components/Preference';
import Login from './components/Login';

function App() {
  const [token, setToken] = useState();
  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Preference" element={<Preferences />} />
            </Routes>
          </div>
        </div>
      </div>
      </BrowserRouter>
    </div>
  );
}
export default App;