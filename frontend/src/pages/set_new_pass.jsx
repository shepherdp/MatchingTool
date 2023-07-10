import React, { useState } from 'react'
import { NonLoggedNav } from '../components/navbar'
import { useNavigate } from 'react-router-dom'

const SetNewPass =()=> {
    const navigate = useNavigate()
    const [password, setPassword] = useState(null)
    const path = window.location.href
    const token = path.slice(('https://localhost:3000/reset/'.length))
    console.log(token)
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
            <h1 className='text-center'>Please enter your new password</h1>
            </div>
            <input type="password" name="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)} className='w-[50%] h-[10%] border-b-2 border-[#4169E1] shadow-md shadow-[#4169E1] bg-[#E6F3FE] rounded-lg pl-2 outline-none' />
            <button className='w-[30%] h-[10%] bg-[#4169E1] shadow-md shadow-[#4169E1] rounded-lg text-white hover:scale-105 delay-75' onClick={
              ()=>{
                fetch(`/user/recover`, {
                  method: "POST",
                  credentials: 'include',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({new_pass:password, token: token})
          }).then(response => response.status).then(resp => {
            if(resp === 200){
              navigate('/login')
            }
            else{
              alert(`Your link has expired. Please request a new one`)
            }
          })
              }
            }>Confirm</button>

          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default SetNewPass