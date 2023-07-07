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
    <div className="relative flex justify-between min-w-screen width-screen h-20 bg-transparent">
                <button type='button' onClick={()=>navigate('/dashboard')} className='flex flex-row justify-center place-items-center h-full text-white focus:bg-[#4169E1]'>
                    
                        <div className='ml-8 mb-6 border-b-2 border-white'>
                            <h1 className='font-bold'>TEA</h1>
                        </div>
                        <h1 className="text-6xl font-bold font-display bg-transparent">M</h1>
                        <div className='mt-8 flex align-baseline border-t-2 border-white'>
                            <h1 className='font-bold'>AKER</h1>
                        </div>
                        
                        {/* <p className="leading-[18px] mt-[21px] text-center text-xl font-bold font-display">ATCH <br/> AKER</p> */}
                    
                </button>
                <button className="mr-12 mt-4 align-middle bg-[#002147] mb-6 p-2 pt-1 font-semibold text-white" onClick={
                    ()=>{
                    navigate('/login')}
                }>
                    Login
                </button>
            </div>   
        </div>
    <main className='w-screen h-screen bg-[#E6F3FE]'>
        <section className='flex w-full h-full flex-row justify-center place-items-center'>
            <img src={bg_img} alt="#" className=' object-cover min-w-screen min-h-screen overflow-clip brightness-50' />
            <div className='absolute w-full flex flex-row gap-x-[1%] justify-center place-items-center h-[30%] top-[30%]'>
                <h1 className='text-[#E6F3FE] font-semibold text-[800%]'>TEAM</h1>
                <h1 className='text-[#4169E1] font-semibold text-[800%]'>MAKER</h1>
            </div>
            <div className='absolute w-full flex justify-center place-items-center z-50 pt-[10%]'>
                <div className='w-[60%] text-center'>
                    <p className='text-white text-3xl'>Manage and create teams with pairings of individuals who have not worked together before</p>
                </div> 
            </div>
            <div className='absolute w-full h-[30%] z-50 flex justify-center place-items-center top-[60%]'>
                <button type='button' onClick={
                    ()=>navigate('/register')
                } className='w-[20%] h-[30%] bg-[#4169E1] text-white text-4xl rounded-lg hover:bg-[#2847a4]'>Try Team Maker</button>
            </div>
        </section>
        <section className='w-screen h-screen bg-[#E6F3FE]'></section>
        <Footer/>
    </main>
    
    
    
    </>
  )
}

export default Home;