import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes.jsx'
import AuthProvider from './Providers/AuthProvider/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ParallaxProvider } from 'react-scroll-parallax'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ParallaxProvider>
    <div className='max-w-7xl mx-auto'>
        <QueryClientProvider client={queryClient}>
          <AuthProvider >
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
    </div>
      </ParallaxProvider>
  </React.StrictMode>
)
