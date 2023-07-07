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
    <div className='fixed w-full'>
        <NonLoggedNav name='Login' direction='/login'/>
        </div>
    <main className='w-screen h-screen bg-[#E6F3FE]'>
        <section className='flex w-full h-full justify-center place-items-center'>
            <img src={bg_img} alt="#" className=' object-cover min-w-screen min-h-screen overflow-clip' />
            <div>
                <h1>TEAM MAKER</h1>
            </div>

        </section>
        <section className='w-screen h-screen bg-[#E6F3FE]'></section>
        <Footer/>
    </main>
    
    
    
    </>
  )
}

export default Home;