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
                <button className="mr-12 mt-4 align-middle bg-[#002147] mb-6 p-2 pt-1 font-semibold text-white rounded-lg" onClick={
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
            <div className='font-semibold text-[600%] md:[700] lg:text-[800%] absolute w-full flex flex-row gap-x-[1%] justify-center place-items-center h-[30%] top-[30%]'>
                <h1 className='text-[#E6F3FE]'>TEAM</h1>
                <h1 className='text-[#4169E1]'>MAKER</h1>
            </div>
            <div className='absolute w-full flex justify-center place-items-center z-50 pt-[15%]'>
                <div className='w-[60%] text-center'>
                    <p className='text-white text:xl md:text-2xl lg:text-3xl'>Simplify the teammate pairing process and build fresh and well balenced teams.</p>
                </div> 
            </div>
            <div className='absolute w-full h-[30%] z-50 flex justify-center place-items-center lg:top-[75%] top-[70%]'>
                <button type='button' onClick={
                    ()=>navigate('/register')
                } className=' relative w-[25%] lg:w-[15%] h-[30%] bg-[#4169E1] text-white text-[80%] md:text-md lg:text-lg rounded-md delay-75 hover:scale-[105%]'>GET STARTED</button>
            </div>
        </section>
        <section className='w-screen h-screen'>
            <div className='relative w-full h-full bg-[#253260] flex flex-col justify-center place-items-center  lg-text-lg '>
                <div className='relative w-[70%] h-full text-[#E6F3FE] flex flex-col  right-[1%] top-[20%] lg:top-[25%] text-center place-items-center'>
                    <p className='toprelative text-3xl font-bold text-[#a9befb]'>What is Team Maker for?</p> 
                    <p className='relative text-xl top-[2%]'>Team Maker allows you to streamline the process of team formation and enhance collaboration. Whether you are a teacher, project manager, or organizer, Team Maker simplifies the task of creating effective teams from a list of students or participants. The individual rating system allows you to distribute people based on ratings</p>
                    <button type='button' onClick={
                        ()=>navigate('/register')
                    } className='top-[10%] relative w-[20%] h-[8%] bg-[#4169E1] text-white  text-sm md:text-md lg:text-lg rounded-md delay-75 hover:scale-[105%]'>GET STARTED</button>
                </div>
            </div>
        </section>

        <section className='w-screen h-screen'>
            <div className='w-full h-full bg-[#455489] flex flex-col justify-center place-items-center  lg-text-lg '>
                <div className='place-items-center relative w-[85%] h-full text-lg lg:text-xl text-[#E6F3FE] flex flex-col  right-[1%] top-[10%] lg:top-[20%] text-center '>
                    <div className=''><p className='text-left relative text-3xl font-bold text-[#a9befb]'>Features</p> </div>
                    <div className='relative w-full h-[80%] flex flex-row justify-center place-items-center text-left top-[10%]' > 
                        <div className='relative flex flex-col h-full w-[28%]'>
                            <p className='relative text-xl lg:text-2xl font-bold text-[#bdc1cf]'>Fresh teams</p> 
                            <p className='relative text-md lg:text-xl top-[1%] '>Diversify teams by pairing people who have worked together the least.</p>
                        </div>
                        <div className='relative flex flex-col h-full w-[28%] left-[4%]'>
                            <p className='relative text-xl lg:text-2xl font-bold text-[#bdc1cf] '>Individual ratings</p> 
                            <p className='relative text-md lg:text-xl top-[1%]'> Give individuals ratings from 1-5 and then choose an algorithm. Create teams with balenced ratings, equal rated people, or take top ranked people and put one to lead each team.</p>
                        </div>
                        <div className='relative flex flex-col h-full w-[28%] left-[8%]'>
                            <p className='relative text-xl lg:text-2xl font-bold text-[#bdc1cf]'>Special exceptions</p> 
                            <p className='relative text-md lg:text-xl top-[1%]'>Add special pairs of people who refuse or request not to be paired together. </p>
                        </div>
                    </div>
                    
                </div>
                </div>
        </section>

        <section className="bg-[#002147] h-[120px] w-screen">
            <div className="w-[99%] h-full flex justify-center place-items-end flex-col">
                <h1 className="relative mr-8 flex text-end text-white" >copyright 2023</h1>
                <button type='button' 
                // onClick={
                //         ()=>navigate('/register')
                //     }
                     className='relative mr-8 flex text-end text-white top-[15%]'>About Us</button>
            </div>
        </section>
    </main>
    
    
    
    </>
  )
}

export default Home;
