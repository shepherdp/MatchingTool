import React from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const CookieNotice=()=> {
    const navigate = useNavigate();
    const cookie = new Cookies();
  return (
    <section className='fixed w-[60%] h-[20%] lg:w-[30%] lg:h-[20%] z-50 bg-black top-[75%] left-[1%] bg-opacity-[75%] flex flex-col justify-center place-items-center text-center text-white rounded-lg text-xs lg:text-md'>
       <div className='w-full h-[70%] flex justify-center place-items-center'>
        <p className='pl-4 pr-4'>By using this website, you automatically accept that we use cookies. Learn more about our <button onClick={()=>navigate('/privacy')} className=' underline'>privacy and cookies policy</button>.</p>
       </div>
        <div className='h-[30%] w-full flex place-items-center justify-end'>
            <button onClick={()=>{cookie.set('accept_teammaker_cookies', true); window.location.reload(true)}} className='text-white w-[20%] h-[70%] m-4 bg-[#4169E1] rounded-lg hover:scale-105'>Accept</button>
        </div>
    </section>
  )
}

export default CookieNotice;