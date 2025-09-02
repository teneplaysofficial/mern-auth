import React from "react";
import NavBar from "../components/NavBar";
import Header from "../components/Header";

function Home() {
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen bg-[usl('/bg_img.png')] bg-cover bg-center ">
      <NavBar />
      <Header />
    </div>
  );
}

export default Home;
