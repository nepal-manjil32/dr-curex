// src/context/AppContext.jsx
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = "http://localhost:3000";

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data", {
        withCredentials: true,
      });
      if (data.success && data.userData) {
        setUserData(data.userData);
        setIsUserLoggedIn(true);
      } else {
        setUserData(null);
        setIsUserLoggedIn(false);
      }
    } catch (error) {
      setUserData(null);
      setIsUserLoggedIn(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        backendUrl + "/api/user/logout",
        {},
        { withCredentials: true }
      );
    } catch {}
    setUserData(null);
    setIsUserLoggedIn(false);
  };

  const value = {
    backendUrl,
    isUserLoggedIn,
    setIsUserLoggedIn,
    userData,
    setUserData,
    getUserData,
    logout,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
