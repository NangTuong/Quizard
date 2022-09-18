import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

function Nav() {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
      };

        return(
            <nav className='nav'>
                {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Me</Link>
              <a href='/' onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
              <Link to="/">Home</Link>
            </>
          )}
            </nav>
        )
    }


export default Nav;