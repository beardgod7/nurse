import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Register from './Pages/Auth/Register.jsx'
import Login from './Pages/Auth/Login.jsx'
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import User from './Pages/User.jsx'
import NotFound from './Pages/NotFound.jsx'



const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/',
    element: <App />,
  },
  {
    path:'/register',
    element:<Register />,
  },
  {
    path:'/login',
    element:<Login />,
  },
  {
    path:'/user',
    element: <User />,
  },
  
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
    <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
