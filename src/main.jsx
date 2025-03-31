import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './pages/auth/Login.jsx'
import Signup from './pages/auth/Signup.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import NotFound from './pages/notfound/NotFound.jsx'

const router =  createBrowserRouter([
  {
  path: "/",
  element: <App />,
  errorElement: <NotFound />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
