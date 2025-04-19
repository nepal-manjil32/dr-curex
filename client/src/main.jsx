import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Notfound from './pages/notfound/Notfound.jsx'
import Login from './pages/login/Login.jsx'
import Signup from './pages/signup/Signup.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Remedies from './pages/remedies/Remedies.jsx'
import BMI from './pages/bmi/BMI.jsx'


const router =  createBrowserRouter([
  {
  path: "/",
  element: <App />,
  errorElement: <Notfound />
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
  {
    path: "/dashboard/remedies",
    element: <Remedies />
  },
  {
    path: "/dashboard/bmi",
    element: <BMI />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
