import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bg_img from '../images/bg_img.jpg'
import { getCookie, server_domain } from '../components/queries';
function Home() {
    const [jwt, setJwt] = useState(null) 
    let navigate = useNavigate();
    const team = ['Zaki', 'Dr. Shepherd', 'Silas', 'Tojo' ]

    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'X-CSRF-TOKEN': getCookie('csrf_access_token'),
            'Content-Type': 'application/json'
        }
      }

    useEffect(()=>{
        fetch(`${server_domain}/user/dashboard`, options).then(response=> response)
        .then(resp=> {
            setJwt(resp.status)
        })
    }, [])
    if(jwt===200){
      navigate('/login')
    }
  return (
    <>
    
    <main className='w-screen min-h-screen h-screen bg-[#E6F3FE]'>
    <div className='fixed w-full z-50'>
    <div className="relative flex justify-between min-w-screen width-screen h-20 bg-transparent">
                <button type='button' onClick={()=>navigate('/')} className='flex flex-row justify-center place-items-center h-full text-white focus:bg-transparent'>
                    
                        <div className='ml-8 mb-6 border-b-2 border-white'>
                            <h1 className='font-bold'>TEA</h1>
                        </div>
                        <h1 className="text-6xl font-bold font-display bg-transparent">M</h1>
                        <div className='mt-8 flex align-baseline border-t-2 border-white'>
                            <h1 className='font-bold'>AKER</h1>
                        </div>
                        
                    
                </button>
                <button className="mr-12 mt-4 align-middle bg-[#002147] mb-6 p-2 pt-1 font-semibold text-white rounded-lg" onClick={
                    ()=>{
                    navigate('/login')}
                }>
                    Login
                </button>
            </div>   
        </div>
        <section className='flex w-full h-full flex-row justify-center place-items-center'>
            <img src={bg_img} alt="#" className=' object-cover min-w-screen min-h-screen overflow-clip brightness-50' />
            <div className='absolute w-full flex flex-row gap-x-[1%] justify-center place-items-center h-[30%] top-[30%] lg:text-[800%] text-[300%]'>
                <h1 className='text-[#E6F3FE] font-semibold '>TEAM</h1>
                <h1 className='text-[#4169E1] font-semibold'>MAKER</h1>
            </div>
            <div className='absolute w-full flex justify-center place-items-center z-50 pt-[10%]'>
                <div className='w-[60%] text-center lg:text-[140%] text-gray-300'>
                    <p>Manage and create teams with pairings of individuals who have not worked together before</p>
                </div> 
            </div>
            <div className='absolute w-full h-[30%] z-40 flex justify-center place-items-center top-[60%]'>
                <button type='button' onClick={
                    ()=>navigate('/register')
                } className=' relative w-[26%] lg:w-[15%] h-[25%] bg-[#4169E1] text-white text-[80%] md:text-md lg:text-lg rounded-md delay-75 hover:scale-[105%]'>GET STARTED</button>
            </div>
        </section>
        <section className='w-screen h-screen'>
            <div className='relative w-full h-full bg-[#253260] flex flex-col justify-center place-items-center  lg-text-lg '>
                <div className='relative w-[70%] h-full text-[#E6F3FE] flex flex-col  right-[1%] top-[20%] lg:top-[25%] text-center place-items-center'>
                    <p className='toprelative text-3xl font-bold text-[#a9befb]'>What is Team Maker for?</p> 
                    <p className='relative text-xl top-[2%]'>Team Maker allows you to streamline the process of team formation and enhance collaboration. Whether you are a teacher, project manager, or organizer, Team Maker simplifies the task of creating effective teams from a list of students or participants. The individual rating system allows you to distribute people based on ratings</p>
                    <button type='button' onClick={
                        ()=>navigate('/register')
                    } className='top-[10%] relative w-[40%] h-[7%] lg:w-[20%] bg-[#4169E1] text-white  text-sm md:text-md lg:text-lg rounded-md delay-75 hover:scale-[105%]'>GET STARTED</button>
                </div>
            </div>
        </section>

        <section className='w-screen h-screen'>
            <div className='w-full h-full bg-[#455489] flex flex-col justify-center place-items-center  lg-text-lg '>
                <div className='place-items-center relative w-[85%] h-full text-lg lg:text-xl text-[#E6F3FE] flex flex-col  right-[1%] top-[10%] lg:top-[20%] text-center '>
                    <div className=''><p className='text-left relative text-3xl font-bold text-[#a9befb]'>Features</p> </div>
                    <div className='relative w-full h-[80%] flex flex-row justify-center place-items-center text-center top-[10%]' > 
                        <div className='relative flex flex-col h-full w-[28%]'>
                            <p className='relative text-lg lg:text-2xl font-bold text-[#bdc1cf]'>Fresh teams</p> 
                            <p className='relative text-sm lg:text-lg top-[1%] '>Diversify teams by pairing people who have worked together the least.</p>
                        </div>
                        <div className='relative flex flex-col h-full w-[28%] left-[4%]'>
                            <p className='relative text-lg lg:text-xl font-bold text-[#bdc1cf] '>Individual ratings</p> 
                            <p className='relative text-sm lg:text-lg top-[1%]'> Give individuals ratings from 1-5 and then choose an algorithm. Create teams with balenced ratings, equal rated people, or take top ranked people and put one to lead each team.</p>
                        </div>
                        <div className='relative flex flex-col h-full w-[28%] left-[8%]'>
                            <p className='relative text-lg lg:text-2xl font-bold text-[#bdc1cf]'>Special exceptions</p> 
                            <p className='relative text-sm lg:text-lg top-[1%]'>Add special pairs of people who refuse or request not to be paired together. </p>
                        </div>
                    </div>
                    
                </div>
                </div>
        </section>

        <section className="bg-[#002147] h-[20%] w-screen">
            <div className="w-[99%] h-full flex justify-center place-items-end flex-col gap-y-[50%]">
               
                <button type='button' 
                     className='relative mr-8 flex text-end text-white top-[15%]' onClick={()=>navigate('/aboutteam')}>About Us</button>
                 <h1 className="relative mr-8 flex text-end text-white" >copyright 2023</h1>
            </div>
        </section>
    </main>
    
    
    
    </>
  )
}

export default Home;