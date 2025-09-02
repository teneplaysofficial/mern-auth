import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";

const Home = React.lazy(() => import("./pages/Home"));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/email-verify" element={<EmailVerify />}></Route>
      <Route path="/reset-password" element={<ResetPassword />}></Route>
    </Routes>
  );
}
