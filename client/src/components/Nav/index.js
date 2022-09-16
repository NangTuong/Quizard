import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

function Nav() {
    function showNav(){
        if (Auth.loggedIn()) {
            return (
                <ul className= "flex-row">
                    <li className="mx-1">
                        <Link>Placeholder</Link>
                    </li>
                    <li className="flex-row">
                        <Link>Placeholder</Link>
                    </li>
                    <li className="mx-1">
                        <a href="/" onClick={() => Auth.logout}>
                            Logout
                        </a>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="flex-row">
                    <li className="mx-1">
                        <Link>
                            Signup
                        </Link>
                    </li>
                    <li className="mx-1">
                        <Link>
                            Login
                        </Link>
                    </li>
                </ul>
            );
        }
    }

    return (
        <header className="flex-row px-1">
            <h1>
                <Link to="/">
                    Quizard
                </Link>
            </h1>

            <nav>
                {showNav()}
            </nav>
        </header>
    );
}

export default Nav;