import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { AuthProvider } from './context/AuthContext.jsx';
import { ArticleProvider } from './context/ArticleContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ArticleProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ArticleProvider>
  </React.StrictMode>,
);
