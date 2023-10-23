import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import '../styles/App.css';
import DisplayBios from './DisplayBios';
import AddDeveloper from './AddDeveloper';
import Home from './Home';
import Navbar from './Navbar';
import EditDeveloper from './EditDeveloper';
import SearchDevelopers from './SearchDevelopers';
import Login from './Login';
import SignUp from './SignUp';
import Quiz from './Quiz';


function App(){

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bios" element={<DisplayBios />} />
        <Route path="/create-bio" element={<AddDeveloper />} />
        <Route path="/edit/:id" element={<EditDeveloper />} />
        <Route path="/search" element={<SearchDevelopers />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
