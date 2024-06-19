import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthenticationContextProvider } from './services/authentication/Authentication.context.tsx'
import { CartProvider } from './services/cartContext/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthenticationContextProvider>
  </React.StrictMode>,
)