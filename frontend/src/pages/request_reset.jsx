import React, { useState } from 'react'
import { NonLoggedNav } from '../components/navbar';
import { useNavigate } from 'react-router-dom';

const RequestReset =()=> {
  const navigate = useNavigate()
  const [email, setEmail] = useState(null)
  return (
    <>
    <section className='w-screen h-screen bg-[#E6F3FE]'>
      <div className='bg-[#4169E1]'>
      <NonLoggedNav name='Login' direction='/login'/>
      </div>
      <div className='w-full h-[80%] relative flex justify-center place-items-center'>
        <div className='w-[50%] h-[50%] bg-[#4169E1] relative'>
          <div className='w-full h-full bg-white absolute -top-[3%] -left-[3%] flex justify-center place-items-center flex-col gap-y-[5%]'>
            <div className='w-[80%] text-md text-gray-600 flex place-items-center justify-center'>
            <h1 className='text-center'>Please enter the email address linked to your account</h1>
            </div>
            <input type="text" name="email" placeholder='email address' onChange={(e)=>setEmail(e.target.value)} className='w-[50%] h-[10%] border-b-2 border-[#4169E1] shadow-md shadow-[#4169E1] bg-[#E6F3FE] rounded-lg pl-2 outline-none' />
            <button className='w-[30%] h-[10%] bg-[#4169E1] shadow-md shadow-[#4169E1] rounded-lg text-white hover:scale-105 delay-75' onClick={
              ()=>{
                fetch(`/user/reset`, {
                  method: "POST",
                  credentials: 'include',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({email:email})
          }).then(response => response.status).then(resp => {
            if(resp === 200){
              navigate('/login')
            }
            else{
              alert(`There is no account linked to ${email}`)
            }
          })
              }
            }>Request Link</button>

          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default RequestReset;