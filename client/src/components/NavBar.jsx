import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "sonner";
import axios from "axios";

function NavBar() {
  const navigate = useNavigate();
  const { userData, backend_url, setUserData, setIsLoggedin } =
    useContext(AppContext);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(backend_url + "/api/auth/send-verify-otp");

      if (res.data.success) {
        setIsLoggedin(false);
        setUserData(null);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(backend_url + "/api/auth/logout");

      if (res.data.success) {
        navigate("/email-verify");
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <div>
        <img
          onClick={() => navigate("/")}
          src="logo.svg"
          alt="logo"
          className="w-28 sm:32 cursor-pointer"
        />
      </div>
      <div>
        {userData ? (
          <div className="space-x-3">
            {userData.isAccountVerfied && (
              <button
                onClick={sendVerificationOtp}
                className="border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
              >
                Verify Email
              </button>
            )}
            <button
              onClick={logout}
              className="border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
