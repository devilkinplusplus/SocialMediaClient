import React from 'react'
import { NavLink } from 'react-router-dom'
function Sidebar() {
  return (
    <div className='bg-gray-100 h-full'>
      <ul className="space-y-3 pt-4 text-gray-600">
          <li>
            <NavLink
              to="/admin/"
              className="block py-2 px-6 rounded-md hover:bg-gray-200 transition-colors"
              >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="users"
              className="block py-2 px-6 rounded-md hover:bg-gray-200 transition-colors"
              >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="block py-2 px-6 rounded-md hover:bg-gray-200 transition-colors"
              >
              Back Home
            </NavLink>
          </li>
      </ul>
    </div>
  )
}

export default Sidebar