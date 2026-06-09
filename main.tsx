import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx' // Garanta que aponta para o App.tsx na mesma pasta
import './index.css'        // Importação dos estilos do Tailwind

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)