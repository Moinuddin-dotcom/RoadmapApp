import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { Router } from './Routes/Router.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createHead, UnheadProvider } from '@unhead/react/client'
// import { createHead, HeadProvider } from '@unhead/react'

const queryClient = new QueryClient()
const head = createHead();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <UnheadProvider head={head}>
          <RouterProvider router={Router} />
          <Toaster position='top-right' reverseOrder={false} />
        </UnheadProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
