import React, { useContext } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import AuthContext from '../contexts';

function Navbar() {
    const { isLoggedIn, signOut } = useContext(AuthContext);


  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-between">
        <Link className="navbar-brand" to="/">
            <img className="brand" src={logo} alt='logo' /> 
        </Link>
        <ul className="navbar-nav right-margin">
            <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
                <Link to="/bios" className="nav-link">Developer Bios</Link>
            </li>
            <li className="nav-item">
                <Link to="/create-bio" className="nav-link">Create Bio</Link>
            </li>
            <li className="nav-item">
                <Link to="/search" className="nav-link">Search</Link>
            </li>
            <li className="nav-item">
                <Link to="/quiz" className="nav-link">Quiz</Link>
            </li>
            <li className="nav-item">
                {
                    isLoggedIn
                    ?
                        <Link 
                            to="/login" 
                            className="nav-link" 
                            onClick={ () =>  signOut() } 
                        >Sign Out</Link>
                    :
                        <Link to="/login" className="nav-link">Login</Link>
                }
            </li>
        </ul>
    </nav>
  );
}

export default Navbar; 