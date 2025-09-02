import axios from "axios";
import React, { createContext } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";

const AppContext = createContext();

const AppContextProvider = (props) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserData = useCallback(async () => {
    axios.defaults.withCredentials = true
    try {
      const res = await axios.get(backend_url + "/api/user/data");
      
      res.data.success
        ? setUserData(res.data.userData)
        : toast.error(res.data.message || "Something went wrong");
    } catch (error) {
      toast.error(error.message || "Server error");
    }
  }, [setUserData, backend_url]);

  const getAuthState = useCallback(async () => {
    axios.defaults.withCredentials = true
    try {
      const res = await axios.get(backend_url + "/api/auth/is-auth");

      if (res.data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backend_url, getUserData, setIsLoggedin]);

  useEffect(() => {
    getAuthState();
  }, [getAuthState]);

  const value = {
    backend_url,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
