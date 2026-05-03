import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Prevent automatic scroll restoration on page reload
window.history.scrollRestoration = 'manual';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
