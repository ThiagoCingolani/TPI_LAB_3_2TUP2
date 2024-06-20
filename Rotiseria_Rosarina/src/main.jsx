import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthenticationContextProvider } from './services/authentication/Authentication.context.tsx'
import { CartProvider } from './services/cartContext/CartContext.jsx'
import MainLayout from './components/layout/MainLayout.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <CartProvider>
        <MainLayout>
          <App />
        </MainLayout>
      </CartProvider>
    </AuthenticationContextProvider>
  </React.StrictMode>,
)