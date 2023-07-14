import React, { useState } from 'react'
import { NonLoggedNav } from '../components/navbar'
import { useNavigate } from 'react-router-dom'
import { resetPassSchema, schema } from '../validation/validate_registration';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const SetNewPass =()=> {
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(resetPassSchema),
      });
    const [expired, setExpired] = useState(null)
    const navigate = useNavigate()
    const [password, setPassword] = useState(null)
    const path = window.location.href
    const token = path.slice(('https://www.teammakeronline.com/reset/'.length))
  return (
    <>
    <section className='w-screen h-screen bg-[#E6F3FE]'>
      <div className='bg-[#4169E1]'>
      <NonLoggedNav name='Login' direction='/login'/>
      </div>
      <div className='w-full h-[80%] relative flex justify-center place-items-center'>
        <div className='w-[50%] h-[50%] bg-[#4169E1] relative'>
          {expired === null && <form onSubmit={handleSubmit(
            (data)=>{
                fetch(`https://teammaker.onrender.com/user/recover`, {
                    method: "POST",
                    credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({new_pass:data.password, token: token})
                }).then(response => response.status).then(resp => {
                if(resp === 200){
                    setExpired(false)
                }
                else{
                setExpired(true)
                }
                })
            }
          )} className='w-full h-full bg-white absolute -top-[3%] -left-[3%] flex justify-center place-items-center flex-col gap-y-[5%]'>
            <div className='w-[80%] text-md text-gray-600 flex place-items-center justify-center'>
                <h1 className='text-center'>Please enter your new password</h1>
            </div>
            <input {...register('password')} type="password" placeholder='password' required className='w-[50%] h-[10%] border-b-2 border-[#4169E1] shadow-md shadow-[#4169E1] bg-[#E6F3FE] rounded-lg pl-2 outline-none' />
            <p className='text-xs text-[#EE4B2B]'>{errors.password?.message}</p>
            <input {...register('passwordConfirmation')} type="password" placeholder='confirm password' required className='w-[50%] h-[10%] border-b-2 border-[#4169E1] shadow-md shadow-[#4169E1] bg-[#E6F3FE] rounded-lg pl-2 outline-none' />
            <p className='text-xs text-[#EE4B2B]'>{errors.passwordConfirmation?.message}</p>
            <button className='w-[30%] h-[10%] bg-[#4169E1] shadow-md shadow-[#4169E1] rounded-lg text-white hover:scale-105 delay-75'>Confirm</button>

          </form>}

          {expired && <div className='w-full h-full bg-white absolute -top-[3%] -left-[3%] flex justify-center place-items-center flex-col gap-y-[5%]'>
            <h1 className='text-red-600'>Your link has expired! Please request a new one.</h1>
          <button type='button' onClick={()=>navigate('../reset')} className='w-[30%] h-[10%] bg-[#4169E1] shadow-md shadow-[#4169E1] rounded-lg text-white hover:scale-105 delay-75'>Get New Link</button>
          </div>}

          {expired === false && <div className='w-full h-full bg-white absolute -top-[3%] -left-[3%] flex justify-center place-items-center flex-col gap-y-[5%]'>
            <h1 className='text-green-500'>Password changed successfully!</h1>
          <button type='button' onClick={()=>navigate('../login')} className='w-[30%] h-[10%] bg-[#4169E1] shadow-md shadow-[#4169E1] rounded-lg text-white hover:scale-105 delay-75'>Go to Login</button>
          </div>}
        </div>
      </div>
    </section>
    </>
  )
}

export default SetNewPass