import React from "react";
import Header from "../../../components/home/layout/header";
import Footer from "../../../components/home/layout/footer";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../../../components/home/layout/leftSidebar";

function HomeLayout() {
  return (
    <div className="flex flex-col min-h-screen font-opensans">
      <Header />
      <div className="flex flex-grow">
        {/* Left Sidebar */}
        <div className="flex-none w-1/5">
          <LeftSidebar />
        </div>

        {/* Outlet (Middle Content) */}
        <div className="flex-grow pb-5">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomeLayout;
