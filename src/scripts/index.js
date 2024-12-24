import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import swRegister from './utils/sw-register';
import App from './App';

import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'react-modern-drawer/dist/index.css'
import 'toastify-js/src/toastify.css';
import '../styles/style.css';
import '../styles/responsive.css';
import './components/contents/skip-link';

const root = createRoot(document.getElementById('root'));
root.render(<BrowserRouter><App /></BrowserRouter>);
swRegister();
