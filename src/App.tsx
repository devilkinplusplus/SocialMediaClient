import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomeLayout from "./pages/home/layout/homeLayout";
import Register from "./pages/home/auth/register";
import Login from "./pages/home/auth/login";
import Ranks from "./components/home/uikits/ranks";
import Explore from "./components/home/uikits/explore";
import News from "./components/home/uikits/news";
import Settings from "./components/home/uikits/settings";
import Account from "./components/home/uikits/account";
import NotFound from "./components/home/notFound";
import AdminLayout from "./pages/admin/layout/adminLayout";
import ForgotPassword from "./components/home/password/forgotPassword";
import AuthLayout from "./pages/home/auth/authLayout";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/home/privateRoute";
import DefaultHome from "./pages/home/layout/defaultHome";
import PrivateRouteAdmin from "./components/home/privateRouteAdmin";

function App() {

  return (
    <>
    <Routes>

      <Route path="/" element={<PrivateRoute><HomeLayout /></PrivateRoute>}>
        <Route index={true} element={<DefaultHome />} />
        <Route path="/ranks" element={<Ranks />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/news" element={<News />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/account" element={<Account />} />
      </Route>

      <Route path="/admin" element={<PrivateRouteAdmin><AdminLayout /></PrivateRouteAdmin>}>
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" index={true} element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
    <ToastContainer />
  </>
  );
}

export default App;
