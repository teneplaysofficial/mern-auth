import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Header() {
  const { userData } = useContext(AppContext);
  return (
    <div className="mt-24 px-4 text-center text-gray-800">
      <h1 className="text-xl sm:text-3xl font-medium mb-2">
        Hey {userData ? userData.name : "Developer"}!
      </h1>

      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to our app
      </h2>

      <p className="mb-8 ">
        Let's start with a quick product tour and we will have you up and
        running in no time
      </p>

      <button className=" border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100">
        Get Started
      </button>
    </div>
  );
}

export default Header;
