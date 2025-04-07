import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './pages/auth/Login.jsx'
import Signup from './pages/auth/Signup.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import NotFound from './pages/notfound/NotFound.jsx'
import Ambulance from './pages/ambulance/Ambulance.jsx'
import Appointment from './pages/appointment/Appointment.jsx'
import BPCheck from './pages/bpcheck/BPCheck.jsx'
import Hospital from './pages/hospital/Hospital.jsx'
import Remedies from './pages/remedies/Remedies.jsx'
import Report from './pages/report/Report.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

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
  {
    path: "/ambulance",
    element: <Ambulance />
  },
  {
    path: "/appointment",
    element: <Appointment />
  },
  {
    path: "/bpcheck",
    element: <BPCheck />
  },
  {
    path: "/remedies",
    element: <Remedies />
  },
  {
    path: "/hospital",
    element: <Hospital />
  },
  {
    path: "/report",
    element: <Report />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
