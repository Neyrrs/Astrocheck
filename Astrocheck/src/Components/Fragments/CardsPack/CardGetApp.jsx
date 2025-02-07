import React from 'react'
import SecondaryButton from '../../Elements/Buttons/SecondaryButton';
import CheckedList from '../../../assets/Icons/CheckedList.png';

const CardGetApp = () => {
  return (
    <>
        <div className="mx-[15rem] py-6 px-5  bg-gradient-to-bl from-[#A4B4E0] to-[#dfe7ff3d] h-[8rem] rounded-lg flex gap-10"> 
            <div className="flex flex-col justify-center">
                <p className='text-white text-2xl'>Coba Aplikasi Astrocheck Sekarang!</p>
                <div className="flex gap-5 mt-5 text-white font-light">
                    <p className='flex gap-2'><span><img src={CheckedList} className="w-5 h-5 object-contain" alt="" /></span>Akses Lebih Cepat & Praktis</p>
                    <p className='flex gap-2'><span><img src={CheckedList} className="w-5 h-5 object-contain" alt="" /></span>Notifikasi Real-Time</p>
                    <p className='flex gap-2'><span><img src={CheckedList} className="w-5 h-5 object-contain" alt="" /></span>Design Lebih Minimalis</p>
                </div>
            </div>
            <div className="h-full flex items-center">
                <SecondaryButton text="Unduh"/>
            </div>
        </div>   
    </>
  )
}

export default CardGetApp