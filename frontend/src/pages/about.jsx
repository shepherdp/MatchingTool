import React, { useEffect, useState } from 'react'
import LoggedNav, { NonLoggedNav } from '../components/navbar'
import Footer from '../components/footer'
import tojo from '../images/tojo.JPG'
import alt from '../images/alt.png'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { getCookie, server_domain } from '../components/queries'

const About =()=> {
    const [jwt, setJwt] = useState(null) 
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
            setJwt(resp.ok)
        })
    }, [])
  return (
    <>
    <section className='w-screen h-screen  flex flex-col justify-between place-items-center bg-[#E6F3FE]'>
        <div className='w-full bg-[#4169E1]'>
            {jwt === true ? <LoggedNav/> : <NonLoggedNav name='Login' destination='/login' />}
        </div>
            <div className='w-full h-[10%] flex place-items-center'><h1 className='text-[#4169E1] font-extrabold text-4xl w-full h text-center'>Meet The Team</h1></div>
        <div className='w-full h-full relative flex flex-wrap justify-center lg:flex-row place-items-center gap-x-[3%] lg:gap-x-[1%] overflow-hidden'>
            <div className='w-[40%] h-[45%] lg:w-[20%] lg:h-[80%] bg-white rounded-lg relative flex flex-col justify-center place-items-center shadow-lg shadow-[#4169E1] hover:scale-[101%]  ease-in-out'>
                <div className=' w-28 h-28 lg:w-36 lg:h-36 border-4 border-[#4169E1] rounded-full overflow-hidden mt-2'>
                    <img src={alt} alt='#' className=' object-cover'/>
                </div>
                <div className='h-[60%] w-full text-gray-600 pl-2 flex flex-col gap-y-[3%] justify-normal pr-2 place-items-center text-center'>
                    <h1 className='text-[80%] lg:text-[110%] font-bold'>Silas Fair</h1>
                    <h1 className='text-[60%] lg:text-[80%] font-semibold'>student</h1>
                    <p className=' font-light text-xs'>
                        
                    </p>   
                </div>
                <div className='w-full h-[10%] flex flex-row justify-center place-items-center gap-x-[5%] text-[80%] lg:text-[120%]'>
                    <FaLinkedinIn/>
                    <FaGithub/>
                </div> 
            </div>
            <div className='w-[40%] h-[45%] lg:w-[20%] lg:h-[80%] bg-white rounded-lg relative flex flex-col justify-center place-items-center shadow-lg shadow-[#4169E1] hover:scale-[101%]  ease-in-out'>
                <div className=' w-28 h-28 lg:w-36 lg:h-36 border-4 border-[#4169E1] rounded-full overflow-hidden mt-2'>
                    <img src={tojo} alt="#" className=' object-cover w-[140%] h-[140%]'/>
                </div>
                <div className='h-[60%] w-full text-gray-600 pl-2 flex flex-col gap-y-[3%] justify-normal pr-2 place-items-center text-center overflow-x-auto'>
                    <h1 className='text-[80%] lg:text-[110%] font-bold'>Tojo H. Tsimalay</h1>
                    <h1 className='text-[60%] lg:text-[80%] font-semibold'>Computer science, Berea College</h1>
                    <p className=' font-light text-xs'>
                        I am a junior CS student at Berea College. I am mainly interested in data science and NLP, but
                        I recently grew interest in webapp development. I am the web developer of this project.
                    </p>   
                </div>
                <div className='w-full h-[10%] flex flex-row justify-center place-items-center gap-x-[5%] text-[80%] lg:text-[120%]'>
                    <button type='button' className='text-[#0A66C2]' onClick={()=>window.open('https://www.linkedin.com/in/tojo-tsimalay/', '_blank', 'rel=noopener noreferrer')}><FaLinkedinIn/></button>
                    <button type='button' onClick={()=>window.open('https://github.com/Tojo07', '_blank', 'rel=noopener noreferrer')}><FaGithub/></button>
                </div> 
            </div>
            <div className='w-[40%] h-[45%] lg:w-[20%] lg:h-[80%] bg-white rounded-lg relative flex flex-col justify-center place-items-center shadow-lg shadow-[#4169E1] hover:scale-[101%]  ease-in-out'>
                <div className=' w-28 h-28 lg:w-36 lg:h-36 border-4 border-[#4169E1] rounded-full overflow-hidden mt-2'>
                    <img src={alt} alt="#" className=' object-cover'/>
                </div>
                <div className='h-[60%] w-full text-gray-600 pl-2 flex flex-col gap-y-[3%] justify-normal pr-2 place-items-center text-center'>
                    <h1 className='text-[80%] lg:text-[110%] font-bold'>Zaki Ayoubi</h1>
                    <h1 className='text-[60%] lg:text-[80%] font-semibold'>student</h1>
                    <p className=' font-light text-xs'>

                    </p>   
                </div>
                <div className='w-full h-[10%] flex flex-row justify-center place-items-center gap-x-[5%] text-[80%] lg:text-[120%]'>
                    <FaLinkedinIn/>
                    <FaGithub/>
                </div> 
            </div>
            <div className='w-[40%] h-[45%] lg:w-[20%] lg:h-[80%] bg-white rounded-lg relative flex flex-col justify-center place-items-center shadow-lg shadow-[#4169E1] hover:scale-[101%]  ease-in-out'>
                <div className=' w-28 h-28 lg:w-36 lg:h-36 border-4 border-[#4169E1] rounded-full overflow-hidden mt-2'>
                    <img src={alt} alt="#" className=' object-cover'/>
                </div>
                <div className='h-[60%] w-full text-gray-600 pl-2 flex flex-col gap-y-[3%] justify-normal pr-2 place-items-center text-center'>
                    <h1 className='text-[80%] lg:text-[110%] font-bold'>Dr. Patrick Shepherd</h1>
                    <h1 className='text-[60%] lg:text-[80%] font-semibold'>professor</h1>
                    <p className=' font-light text-xs'>
                        
                    </p>   
                </div>
                <div className='w-full h-[10%] flex flex-row justify-center place-items-center gap-x-[5%] text-[80%] lg:text-[120%]'>
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