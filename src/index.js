import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import swRegister from './utils/sw-register';

import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import './styles/style.css';
import './styles/responsive.css';
import "toastify-js/src/toastify.css"

const root = createRoot(document.getElementById('root'));
root.render(<BrowserRouter><App /></BrowserRouter>);
swRegister();
