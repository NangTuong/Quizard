import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

function Nav() {
  const logout = event => {
      event.preventDefault();
      Auth.logout();
    };

  if (Auth.loggedIn()) {
    return (
      <nav className='nav'>
        <Link to="/" className='nav-link'>Home</Link>
        <Link to="/profile" className='nav-link'>Profile</Link>
        <a href='/' onClick={logout} className='nav-link'>
          Logout
        </a>
      </nav>
    )
  }
  return (
      <nav className='nav'>
        <Link to="/" className='nav-link'>Home</Link>
        <Link to="/login" className='nav-link'>Login</Link>
        <Link to="/signup" className='nav-link'>Signup</Link>
      </nav>
    )
}




export default Nav;