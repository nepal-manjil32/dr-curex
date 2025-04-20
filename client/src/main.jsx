import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import Notfound from "./pages/notfound/Notfound.jsx";
import Login from "./pages/login/Login.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Remedies from "./pages/remedies/Remedies.jsx";
import BMI from "./pages/bmi/BMI.jsx";
import NearbyHospitals from "./pages/nearby-hospitals/NearbyHospitals.jsx";
import Layout from "./Layout.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Notfound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "remedies",
        element: <Remedies />,
      },
      {
        path: "bmi",
        element: <BMI />,
      },
      {
        path: "nearby-hospitals",
        element: <NearbyHospitals />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={1000} />
    </AppContextProvider>
  </StrictMode>
);