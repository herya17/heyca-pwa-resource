import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import LocaleContext from '../contexts/LocaleContext';

function LoginInput({ login }) {
  const { localeContextValue } = React.useContext(LocaleContext);
  const { locale } = localeContextValue;
  const [ email, handleEmailChange ] = useInput('');
  const [ password, handlePasswordChange ] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();

    login({
      email,
      password,
    });
  }

  return (
    <form onSubmit={onSubmitHandler} className='register-input login-input'>
      <input type='email' placeholder='Email' value={email} onChange={handleEmailChange} required />
      <input 
        type='password' 
        placeholder='Password' 
        value={password} 
        onChange={handlePasswordChange} 
        minLength='6' 
        required />
        <button>{locale === 'id' ? 'Masuk' : 'Login'}</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
}

export default LoginInput;
