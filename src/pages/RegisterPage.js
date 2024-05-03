import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

function RegisterPage() {
  const { localeContextValue, themeContextValue } = React.useContext(LocaleContext);
  const { locale } = localeContextValue;
  const { theme } = themeContextValue;

  const navigate = useNavigate();

  const onRegisterHandler = async (user) => {
    const { error } = await register(user);
    if (!error) {
      toast.success(`${locale === 'id' ? 'register berhasil' : 'register success'}`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: `${theme === 'light' ? 'light' : 'dark'}`,
      });
      navigate('/login');
    }
  }

  return (
    <>
    <header>
      <div className='header-register-page'>
        <p>{locale === 'id' ? 'Hola Selamat Datang!' : 'Hola Welcome!'}</p>
        <p>
          {
            locale === 'id' 
              ? 'Ayo daftarin dirimu dulu yah bila kamu belum terdaftar!'
              : 'Come on, register yourself first, if you haven\'t registered yet!'
          }
        </p>
        {/* <p>Daftarin dirimu dulu yah, jangan lupa isinya make hati dan cinta yang tulus!</p> */}
      </div>
    </header>
    <main id='mainContent'>
      <div className='register-page'>
        <RegisterInput register={onRegisterHandler} />
        <p className='have-an-account'>
          {locale === 'id' ? 'Kamu punya akun? ' : 'Have an account? '}
          <Link to='/login'>{locale === 'id' ? 'Masuk aja' : 'Login'}</Link></p>
      </div>
    </main>
    </>
  );
}

export default RegisterPage;
