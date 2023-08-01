import React from 'react'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 py-4">
      <div className="container mx-auto">
        <p className="text-white text-center">
          &copy; {new Date().getFullYear()} Ilkin Rufullayev. All rights reserved.
        </p>
      </div>
  </footer>
  )
}

export default Footer