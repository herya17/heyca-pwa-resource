import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../data/notesapi-source';
import LoginInput from '../components/LoginInput';
import LocaleContext from '../contexts/LocaleContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage({ loginSuccess }) {
  const { localeContextValue, themeContextValue } = React.useContext(LocaleContext);
  const { locale } = localeContextValue;
  const { theme } = themeContextValue;
  const navigate = useNavigate();

  const onLogin = async ({ email, password }) => {
    const { error, data } = await login({ email, password});
    if (!error) {
      loginSuccess(data);
      navigate('/');
    }
  }

  return (
    <>
      <header>
        <div className='header-register-page'>
          <p>{locale === 'id' ? 'Holaa kembali!' : 'Holaa again!'}</p>
          <p>
            {
              locale === 'id'
                ? 'Selamat datang kembali kamu sangat dirindukan lohh!'
                : 'Welcome back i miss you so much!'
            }
          </p>
        </div>
      </header>
      <main id='mainContent'>
        <ToastContainer
          position='bottom-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme={theme === 'light' ? 'light' : 'dark'} />
        <div className='register-page'>
          <LoginInput login={onLogin} />
          <p className='have-an-account'>
            {locale === 'id' ? 'Belum punya akun? ' : 'Don\'t have an account? '}
            <Link to='/register'>
              {locale === 'id' ? 'Daftar dulu' : 'Register'}
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func,
}

export default LoginPage;
