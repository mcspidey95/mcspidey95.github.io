import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HoverProvider } from './hoverContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HoverProvider>
      <App />
    </HoverProvider>
  </React.StrictMode>
);