import React from 'react'
import LoggedNav from '../components/navbar'
import Footer from '../components/footer'
import shot from '../images/headshot.jpg'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
const About =()=> {
  return (
    <>
    <section className='w-screen h-screen  flex flex-col justify-between place-items-center bg-[#E6F3FE]'>
        <div className='w-full'>
            <LoggedNav/>
            </div>
            <div className='w-full h-[10%] flex place-items-center'><h1 className='text-[#4169E1] font-extrabold text-4xl w-full h text-center'>Meet The Team</h1></div>
        <div className='w-full h-full relative flex flex-wrap justify-center lg:flex-row place-items-center gap-x-[3%] lg:gap-x-[1%] overflow-hidden'>
            <div className='w-[40%] h-[45%] lg:w-[20%] lg:h-[80%] bg-white rounded-lg relative flex flex-col justify-center place-items-center shadow-lg shadow-[#4169E1] hover:scale-[101%]  ease-in-out'>
                <div className=' w-28 h-28 lg:w-40 lg:h-40 border-4 border-[#4169E1] rounded-full overflow-hidden'>
                    <img src={shot} alt="#" className=' object-cover'/>
                </div>
                <div className='h-[60%] w-full text-gray-600 pl-2 flex flex-col gap-y-[3%] justify-normal pr-2 place-items-center text-center'>
                    <h1 className='text-[150%] lg:text-[230%] font-bold'>Team Name</h1>
                    <h1 className='text-[110%] lg:text-[130%] font-semibold'>occupation, institution</h1>
                    <p className=' font-light'>
                        you can share anything here. Major, education, passion and so on
                    </p>   
                </div>
                <div className='w-full h-[10%] flex flex-row justify-center place-items-center gap-x-[5%] text-[150%] lg:text-[200%]'>
                    <FaLinkedinIn/>
                    <FaGithub/>
                </div> 
            </div>
            <div className='w-[40%] h-[45%] lg:w-[20%] lg:h-[80%] bg-white rounded-lg relative flex flex-col justify-center place-items-center shadow-lg shadow-[#4169E1] hover:scale-[101%]  ease-in-out'>
                <div className=' w-28 h-28 lg:w-40 lg:h-40 border-4 border-[#4169E1] rounded-full overflow-hidden'>
                    <img src={shot} alt="#" className=' object-cover'/>
                </div>
                <div className='h-[60%] w-full text-gray-600 pl-2 flex flex-col gap-y-[3%] justify-normal pr-2 place-items-center text-center'>
                    <h1 className='text-[150%] lg:text-[230%] font-bold'>Team Name</h1>
                    <h1 className='text-[110%] lg:text-[130%] font-semibold'>occupation, institution</h1>
                    <p className=' font-light'>
                        you can share anything here. Major, education, passion and so on
                    </p>   
                </div>
                <div className='w-full h-[10%] flex flex-row justify-center place-items-center gap-x-[5%] text-[150%] lg:text-[200%]'>
                    <FaLinkedinIn/>
                    <FaGithub/>
                </div> 
            </div>
            <div className='w-[40%] h-[45%] lg:w-[20%] lg:h-[80%] bg-white rounded-lg relative flex flex-col justify-center place-items-center shadow-lg shadow-[#4169E1] hover:scale-[101%]  ease-in-out'>
                <div className=' w-28 h-28 lg:w-40 lg:h-40 border-4 border-[#4169E1] rounded-full overflow-hidden'>
                    <img src={shot} alt="#" className=' object-cover'/>
                </div>
                <div className='h-[60%] w-full text-gray-600 pl-2 flex flex-col gap-y-[3%] justify-normal pr-2 place-items-center text-center'>
                    <h1 className='text-[150%] lg:text-[230%] font-bold'>Team Name</h1>
                    <h1 className='text-[110%] lg:text-[130%] font-semibold'>occupation, institution</h1>
                    <p className=' font-light'>
                        you can share anything here. Major, education, passion and so on
                    </p>   
                </div>
                <div className='w-full h-[10%] flex flex-row justify-center place-items-center gap-x-[5%] text-[150%] lg:text-[200%]'>
                    <FaLinkedinIn/>
                    <FaGithub/>
                </div> 
            </div>
            <div className='w-[40%] h-[45%] lg:w-[20%] lg:h-[80%] bg-white rounded-lg relative flex flex-col justify-center place-items-center shadow-lg shadow-[#4169E1] hover:scale-[101%]  ease-in-out'>
                <div className=' w-28 h-28 lg:w-40 lg:h-40 border-4 border-[#4169E1] rounded-full overflow-hidden'>
                    <img src={shot} alt="#" className=' object-cover'/>
                </div>
                <div className='h-[60%] w-full text-gray-600 pl-2 flex flex-col gap-y-[3%] justify-normal pr-2 place-items-center text-center'>
                    <h1 className='text-[150%] lg:text-[230%] font-bold'>Team Name</h1>
                    <h1 className='text-[110%] lg:text-[130%] font-semibold'>occupation, institution</h1>
                    <p className=' font-light'>
                        you can share anything here. Major, education, passion and so on
                    </p>   
                </div>
                <div className='w-full h-[10%] flex flex-row justify-center place-items-center gap-x-[5%] text-[150%] lg:text-[200%]'>
                    <FaLinkedinIn/>
                    <FaGithub/>
                </div> 
            </div>
        </div>
        <Footer/>    
    </section>    
    
    </>
  )
}

export default About