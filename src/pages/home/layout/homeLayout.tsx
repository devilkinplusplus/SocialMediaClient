import Header from "../../../components/home/layout/header";
import Footer from "../../../components/home/layout/footer";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../../../components/home/layout/leftSidebar";
import React from "react";

function HomeLayout() {
  return (
    <div className="flex flex-col min-h-screen font-opensans">
      <Header />
      <div className="flex flex-col md:flex-row flex-grow ">
        <div className="md:w-1/5">
          <LeftSidebar />
        </div>
        <div className="flex-grow pb-5">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomeLayout;
