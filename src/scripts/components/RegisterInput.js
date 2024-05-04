import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import LocaleContext from '../contexts/LocaleContext';

function RegisterInput({ register }) {
  const { localeContextValue } = React.useContext(LocaleContext);
  const { locale } = localeContextValue;
  const [ name, handleNameChange ] = useInput('');
  const [ email, handleEmailChange ] = useInput('');
  const [ password, handlePasswordChange ] = useInput('');
  const [ confirmPassword, handleConfirmPasswordChange ] = useInput('');
  const [ checkConfirmPassword, setCheckConfirmPassword ] = React.useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password === confirmPassword) {
      register({
        name, email, password,
      });
    }
  }

  const onInputConfirmPasswordHandler = () => {
    setCheckConfirmPassword('correct');
  }

  const onCheckConfirmPasswordHandler = () => {
    if (confirmPassword.length >= 1 && password !== confirmPassword) {
      setCheckConfirmPassword('wrong');
    } else {
      setCheckConfirmPassword('correct');
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='register-input'>
      <input
        type='text'
        placeholder={locale === 'id' ? 'Nama' : 'Name'}
        value={name} onChange={handleNameChange}
        required />
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={handleEmailChange}
        required />
      <input 
        type='password' 
        placeholder='Password' 
        value={password} 
        onChange={handlePasswordChange} 
        minLength='6' 
        required />
      <input 
        className={`confirm-password ${checkConfirmPassword}`}
        type='password' 
        placeholder={locale === 'id' ? 'Konfirmasi Password' : 'Confirm Password'} 
        autoComplete='current-password' 
        value={confirmPassword} 
        onChange={handleConfirmPasswordChange}
        onBlur={onCheckConfirmPasswordHandler}
        onFocus={onCheckConfirmPasswordHandler}
        onInput={onInputConfirmPasswordHandler}
        minLength='6'
        required />
      <button>{locale === 'id' ? 'Daftar' : 'Register'}</button>
    </form>
  );
}

RegisterInput.proptypes = {
  register: PropTypes.func.isRequired,
}

export default RegisterInput;
