import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Web5ContextProvider from './contexts/web5.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Web5ContextProvider>
      <App />
    </Web5ContextProvider>
  </React.StrictMode>,
)
