import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form

const handleFormSubmit = async event => {
  event.preventDefault();

  try {
    const { data } = await login({
      variables: { ...formState }
    });

    Auth.login(data.login.token);
  } catch (e) {
    console.error(e);
  }
};


  return (
    <main >
      <div className='form'>
          <h1>Login</h1>
          <div>
            <form onSubmit={handleFormSubmit}>
              <div className='container'>
                <div>
                  <label htmlFor='email'>Email:</label><br/>
                  <input                
                    placeholder='Your email'
                    name='email'
                    type='email'
                    id='email'
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='password'>Password:</label><br/>
                  <input
                    placeholder='******'
                    name='password'
                    type='password'
                    id='password'
                    value={formState.password}
                    onChange={handleChange}
                  />
                </div>
                  <button className='btn' type='submit'>
                    Submit
                  </button>
              </div>
            </form>
            {error && <div>Login failed</div>}
          </div>
        </div>
    </main>
  );
};


export default Login;

