import React, { useState } from 'react'
import { NonLoggedNav } from '../components/navbar';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const RequestReset =()=> {
  const navigate = useNavigate()
  const [emailSent, setEmailSent] = useState(false)
  const [linkSent, setLinkSent] = useState(null)
  const [email, setEmail] = useState()
  const [isLoading, setIsLoading] = useState(false)
  return (
    <>
    <section className='w-screen h-screen bg-[#E6F3FE]'>
      <div className='bg-[#4169E1]'>
      <NonLoggedNav name='Login' direction='/login'/>
      </div>
      <div className='w-full h-[80%] relative flex justify-center place-items-center'>
        <div className='w-[50%] h-[50%] bg-[#4169E1] relative'>
        <div className='w-full h-full bg-white absolute -top-[3%] -left-[3%]'>
          {emailSent === false &&
            <div className='w-full h-full bg-white absolute flex justify-center place-items-center flex-col gap-y-[5%]'>
            <div className='w-[80%] text-md text-gray-600 flex place-items-center justify-center'>
            <h1 className='text-center'>Please enter the email address linked to your account</h1>
            </div>
            <input type="text" name="email" placeholder='email address' onChange={(e)=>setEmail(e.target.value)} className='w-[50%] h-[10%] border-b-2 border-[#4169E1] shadow-md shadow-[#4169E1] bg-[#E6F3FE] rounded-lg pl-2 outline-none' />
            <button className='w-[30%] h-[10%] bg-[#4169E1] shadow-md shadow-[#4169E1] rounded-lg text-white hover:scale-105 delay-75 flex justify-center place-items-center gap-x-2 disabled:hover:scale-100' disabled={!email} onClick={
              ()=>{
                setIsLoading(true)
                fetch(`https://teammaker.onrender.com/user/reset`, {
                  method: "POST",
                  credentials: 'include',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({email:email})
          }).then(response => response.ok).then(resp => {
            setEmailSent(true);
            setLinkSent(resp);
          })
              }
            }>{
              isLoading === false ? <h1>Get Link</h1> :<><FaSpinner className='animate-spin font-extrabold text-2xl text-center text-white'/> <h1>Loading...</h1></> 
            }</button>

          </div>}
{/* -----------------------------------------------------------> */}
          {linkSent === true &&
            <div className='w-full h-full bg-white absolute flex justify-center place-items-center flex-col gap-y-[5%]'>
            <div className='w-[80%] text-md text-gray-600 flex place-items-center justify-center'>
              <h1 className='text-center text-green-500'>An email has been sent to {email}. 
              Please click on the link on the email to reset your password.</h1>
            </div>
            <button className='w-[30%] h-[10%] bg-[#4169E1] shadow-md shadow-[#4169E1] rounded-lg text-white hover:scale-105 delay-75' onClick={
              ()=>{
                navigate('/login')
              }
            }>Log In</button>

          </div>}
          {linkSent === false &&
            <div className='w-full h-full bg-white absolute flex justify-center place-items-center flex-col gap-y-[5%]'>
            <div className='w-[80%] text-md text-gray-600 flex place-items-center justify-center'>
              <h1 className='text-center text-red-600'>We could not locate any account linked to {email}. 
              Please verify your email address and try again.</h1>
            </div>
            <button className='w-[30%] h-[10%] bg-[#4169E1] shadow-md shadow-[#4169E1] rounded-lg text-white hover:scale-105 delay-75' onClick={
              ()=>{
                window.location.reload(true)
              }
            }>Next</button>

          </div>}
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default RequestReset;