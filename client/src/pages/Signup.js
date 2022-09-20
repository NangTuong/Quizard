import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // use try/catch instead of promises to handle errors
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await addUser({
        variables: {...formState } 
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <div className='form'>
          <h1>Sign Up</h1>
          <div>
            <form onSubmit={handleFormSubmit}>
              <div className='container'>
                <div>
                  <label htmlFor='username'>Username:</label><br/>
                  <input
                    placeholder='Enter your username'
                    name='username'
                    type='username'
                    id='username'
                    value={formState.username}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='email'>Email:</label><br/>
                  <input
                    placeholder='Enter your email'
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
            {error && <div>Sign up failed</div>}
          </div>
        </div>
    </main>
  );
};

export default Signup;
