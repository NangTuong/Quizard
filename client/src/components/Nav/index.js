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
        <Link to="/" className='btn m-10 grow'>Home</Link>
        <Link to="/profile" className='btn m-10 grow'>Profile</Link>
        <a href='/' onClick={logout} className='btn m-10 grow'>
          Logout
        </a>
      </nav>
    )
  }
  return (
      <nav className='nav'>
        <Link to="/" className='btn m-10 grow'>Home</Link>
        <Link to="/login" className='btn m-10 grow'>Login</Link>
        <Link to="/signup" className='btn m-10 grow'>Signup</Link>
      </nav>
    )
}

export default Nav;