import React, { useContext } from 'react';
import { loginUser, updateToken } from '../services/helper';

import { AppContext } from '../context/Store';
import { SET_USER } from '../context/constants';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router';

const Auth = ({ history, handleRegister }) => {
  const dispatch = useContext(AppContext)[1];
  const { handleSubmit, register, errors, formState } = useForm();
  const { isDirty, isSubmitting } = formState;

  const onLogin = async (values) => {
    const data = await loginUser(values);
    if (data.token) {
      updateToken(data.token);
    }
    if (data.token !== null) {
      let userData = data.user;
      dispatch({ type: SET_USER, payload: userData });
      history.push('/home');
    }
  };

  const [state, setState] = React.useState({
    userId: '',
    name: '',
    username: '',
    email: '',
    password: '',
    picture: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const userData = {
    email: state.email,
    name: state.name,
    password: state.password,
  };

  const login = !window.location.search.includes('?register');

  return (
    <div className='carousel'>
      <section className='auth'>
        {login ? (
          <form onSubmit={handleSubmit(onLogin)} className='login-form'>
            <h1>Login</h1>
            <label htmlFor='email'>Email:</label>
            <input
              id='email'
              autoComplete='username'
              className='login-input'
              name='email'
              placeholder='user@email.com'
              onChange={handleChange}
              ref={register({
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && errors.email.message}
            <label htmlFor='password'>Password:</label>
            <input
              id='password'
              className='login-input'
              type='password'
              name='password'
              placeholder='p@$sw0rD'
              autoComplete='current-password'
              onChange={handleChange}
              ref={register({
                required: true,
                min: 3,
                meesage: 'Too short!',
              })}
            />
            {errors.password && errors.password.message}
            <button className='sign-in-btn' disabled={!isDirty || isSubmitting}>
              Sign In
            </button>
          </form>
        ) : (
          <form
            className='register-form'
            onSubmit={(e) => handleRegister(e, userData)}>
            <h1>Register</h1>
            <label htmlFor='name'>Name:</label>
            <input
              id='name'
              className='register-input'
              type='text'
              name='name'
              placeholder='FirstName LastName'
              onChange={handleChange}
              value={state.name}
              required
            />
            <label htmlFor='email'>Email:</label>
            <input
              className='register-input'
              type='email'
              name='email'
              placeholder='user@email.com'
              onChange={handleChange}
              value={state.email}
              required
            />
            <label htmlFor='password'>Password:</label>
            <input
              className='register-input'
              type='password'
              name='password'
              autoComplete='new-password'
              placeholder='p@$sw0rD'
              onChange={handleChange}
              value={state.password}
              required
            />
            <button className='sign-up-btn' disabled={!isDirty || isSubmitting}>
              Sign Up
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default withRouter(Auth);
