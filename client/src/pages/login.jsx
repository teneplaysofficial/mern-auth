import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "sonner";

function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");

  const [data, setData] = useState({ name: "", email: "", password: "" });

  const { backend_url, setIsLoggedin, getUserData } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      let res;

      if (state === "Sign Up") {
        res = await axios.post(`${backend_url}/api/auth/register`, {
          name: data.name,
          email: data.email,
          password: data.password,
        });
      } else {
        res = await axios.post(`${backend_url}/api/auth/login`, {
          email: data.email,
          password: data.password,
        });
      }

      if (res.data.success) {
        toast.success(res.data.message || (state === "Sign Up" ? "Account created successfully" : "Login successful"));

        setIsLoggedin(true);
        getUserData();
        navigate("/");
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Request failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src="logo.svg"
        alt="logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign Up" ? "Create your account" : "Login to your account!"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="flex items-center mb-4 gap-3 w-full px-5 mt-4 py-2.5 rounded-full bg-[#333A5C]">
              <input
                onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
                value={data.name}
                type="text"
                placeholder="Full Name"
                required
                className="bg-transparent outline-none w-full"
              />
            </div>
          )}
          <div className="flex items-center mb-4 gap-3 w-full px-5 mt-4 py-2.5 rounded-full bg-[#333A5C]">
            <input
              onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
              value={data.email}
              type="email"
              placeholder="Email"
              required
              className="bg-transparent outline-none w-full"
            />
          </div>
          <div className="flex items-center mb-4 gap-3 w-full px-5 mt-4 py-2.5 rounded-full bg-[#333A5C]">
            <input
              onChange={(e) => setData((prev) => ({ ...prev, password: e.target.value }))}
              value={data.password}
              type="password"
              placeholder="Password"
              required
              className="bg-transparent outline-none w-full"
            />
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 cursor-pointer text-indigo-500"
          >
            Forgot password?
          </p>

          <button className="cursor-pointer w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
            {state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="mt-4 text-gray-400 text-center text-xs">
            Already have an account?{" "}
            <span
              onClick={() => setState("Log In")}
              className="underline text-blue-400 cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-4 text-gray-400 text-center text-xs">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="cursor-pointer underline text-blue-400"
            >
              Signup
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
