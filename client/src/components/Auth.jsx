import { loginUser, updateToken } from '../services/helper';

import React from 'react';
import { Spinner } from './Spinner';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router';

const Auth = ({ history, user, setUser, handleRegister }) => {
  const { handleSubmit, register, errors, formState } = useForm();
  const { isDirty, isSubmitting } = formState;
  console.log({ isDirty, isSubmitting });

  const onLogin = async (values) => {
    const resp = await loginUser(values);
    updateToken(resp.token);
    if (resp.token !== null) {
      setState((prevState) => ({
        ...prevState,
        isLoggedIn: true,
      }));
      setUser(resp.userData);
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
            <h2>Login</h2>
            {!isSubmitting ? (
              <>
                <input
                  autoComplete='username'
                  className='login-input'
                  name='email'
                  placeholder='Email'
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
                <input
                  className='login-input'
                  placeholder='Password'
                  type='password'
                  name='password'
                  autoComplete='current-password'
                  onChange={handleChange}
                  ref={register({
                    required: true,
                    min: 3,
                    meesage: 'Too short!',
                  })}
                />
                {errors.password && errors.password.message}
                <button className='sign-in-btn' disabled={!isDirty}>
                  Sign In
                </button>
              </>
            ) : (
              <Spinner />
            )}
          </form>
        ) : (
          <form className='register-form' onSubmit={(e) => handleRegister(e, userData)}>
            <h2>Register</h2>
            <input
              className='register-input'
              type='text'
              name='name'
              placeholder='Name'
              onChange={handleChange}
              value={state.name}
              required
            />
            <input
              className='register-input'
              type='email'
              name='email'
              placeholder='Email'
              onChange={handleChange}
              value={state.email}
              required
            />
            <input
              className='register-input'
              type='password'
              placeholder='Password'
              name='password'
              onChange={handleChange}
              value={state.password}
              required
            />
            <button className='sign-up-btn' disabled={!isDirty}>
              Sign Up
            </button>
          </form>
        )}
        {isSubmitting && <Spinner />}
      </section>
    </div>
  );
};

export default withRouter(Auth);
