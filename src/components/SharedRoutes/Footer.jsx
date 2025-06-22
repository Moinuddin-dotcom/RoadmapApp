import React from 'react'

const Footer = () => {
  return (
    <div className='my-5 border-t border-gray-500 py-5 px-20 bg-gray-100'>
      <h1 className='text-2xl font-bold text-center'>Roadmap App</h1>
      <p className='text-md text-gray-500 font-semibold text-center'>Copyright © {new Date().getFullYear()} - All right reserved by Roadmap Industries Ltd</p>
      <div className='text-md text-blue-500 font-semibold flex justify-center gap-4 mt-4'>
        <a href="">Facebook</a>
        |
        <a href="">Twitter</a>
        |
        <a href="">LinkdIn</a>
      </div>
    </div>
  )
}

export default Footer
