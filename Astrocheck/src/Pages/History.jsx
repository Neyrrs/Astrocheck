import React from 'react'
import Navbar from '../Components/Navbar'
import TitleBackground from '../assets/Login/TitleBackground.png'
import Input from '../Components/Input'

const Login = () => {
  return (
    <div className=''>
    <Navbar />
    <div className="title-bg mt-14 h-20 px-14 flex w-full items-center">
      <p className='text-black text-xl'>Riwayat Absen</p>
    </div>
    <div className="">
      <div className="inputSearch h-20 flex items-center px-14 justify-end">
        <Input />
      </div>
    </div>
   </div>
  )
}

export default Login