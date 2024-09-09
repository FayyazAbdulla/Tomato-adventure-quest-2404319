import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AboutGame from './components/AboutGame';
import GuestPlay from './components/GuestPlay';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import RegisterPlay from './components/RegisterPlay';
import ScoreBoard from './components/ScoreBoard';
import UserProfile from './components/ProfileCard';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutGame />} />
        <Route path="/guest-play" element={<GuestPlay />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-play" element={<RegisterPlay />} />
        <Route path="/scoreboard" element={<ScoreBoard />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
