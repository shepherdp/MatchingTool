import React from 'react'
import { useNavigate } from 'react-router-dom';

const NotFound = ()=> {
    const navigate = useNavigate()
  return (
    <div className='bg-[#E6F3FE] w-screen h-screen relative text-gray-600 flex justify-center place-items-center gap-y-[5%] flex-col'>
        <h1 className='text-[500%] w-full text-center font-extrabold text-gray-600'>
            404 page not found
        </h1>
        <h1 className='w-full text-center font-bold'>
            have you been lost?
        </h1>
        <button type='button' onClick={()=> navigate('/')} className='w-[20%] h-[5%] text-white bg-[#4169E1]'>
            return to home
        </button>
    </div>
  )
}

export default NotFound;