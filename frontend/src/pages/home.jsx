import React from 'react'
import { useNavigate } from 'react-router-dom'
import LoggedNav, { NonLoggedNav } from '../components/navbar';
import Footer from '../components/footer';
import {AiOutlineUser} from 'react-icons/ai';
import {BiSolidUser, BiSolidUserCheck, BiAbacus} from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import bg_img from '../images/bg_img.jpg'
function Home() {
    let navigate = useNavigate();
    const team = ['Zaki', 'Dr. Shepherd', 'Silas', 'Tojo' ]


  return (
    <>
    <div className='fixed w-full z-50'>
        <NonLoggedNav name='Login' direction='/login'/>
        </div>
    <main className='w-screen h-screen bg-[#E6F3FE]'>
        <section className='flex w-full h-full justify-center place-items-center'>
            <img src={bg_img} alt="#" className=' object-cover min-w-screen min-h-screen overflow-clip brightness-50' />
            <div className='absolute w-full flex flex-row gap-x-[1%] justify-center place-items-center h-[30%] top-[40%]'>
                <h1 className='text-[#E6F3FE] font-semibold text-[800%]'>TEAM</h1>
                <h1 className='text-[#4169E1] font-semibold text-[800%]'>MAKER</h1>
            </div>

        </section>
        <section className='w-screen h-screen bg-[#E6F3FE]'></section>
        <Footer/>
    </main>
    
    
    
    </>
  )
}

export default Home;