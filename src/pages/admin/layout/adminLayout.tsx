import React from 'react'
import Header from '../../../components/admin/layout/header'
import Footer from '../../../components/admin/layout/footer'
import Sidebar from '../../../components/admin/layout/sidebar'
import { Outlet } from 'react-router-dom'

function AdminLayout() {

  return (
    <div className="flex flex-col min-h-screen font-opensans">
      <Header />
      <div className="flex flex-grow">
        {/* Left Sidebar */}
        <div className="flex-none w-1/5">
          <Sidebar />
        </div>

        {/* Outlet (Middle Content) */}
        <div className="flex-grow pb-5">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminLayout