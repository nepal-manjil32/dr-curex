import React from "react";
import Doctor from "../../components/doctor/Doctor";
import Minimalnav from "../../components/minimalnav/Minimalnav";
import { AppContextProvider } from "../../context/AppContext";

const Appointment = () => {
  return (
    <div className="appointment">
      <AppContextProvider>
        <Minimalnav />
        <Doctor />
      </AppContextProvider>
    </div>
  );
};

export default Appointment;
