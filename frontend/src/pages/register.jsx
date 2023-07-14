import {server_domain} from '../components/queries';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from '../validation/validate_registration';
import {useNavigate} from "react-router-dom";
import { NonLoggedNav } from '../components/navbar';
import bg_img from '../images/bg_img.jpg'
import { useState } from 'react';

const Register=()=> {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false)
  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(schema),
  });

  

  return (
    <>
      
      <main className="min-h-screen">
        <div className='fixed w-full z-50'>
        <NonLoggedNav name='Login' direction='/login' />
        </div>
        <section className=' h-screen w-screen flex justify-center place-items-center '>
        <img src={bg_img} alt="#" className=' object-cover min-w-screen min-h-screen overflow-clip brightness-[50%]' /> 
        <div className='absolute w-[50%] h-[60%] z-50 lg:w-[30%] lg:h-[60%] rounded-lg shadow-md shadow-[#4169E1] bg-gray-700 bg-opacity-[23%]'>
        <div className='relative w-full h-full rounded-lg shadow-2xl'>
              <div className='relative w-full h-full'>
              <div className='h-[10%] w-full gap-x-[2%] flex flex-row justify-center place-items-center font-bold text-2xl lg:text-4xl'>
            <h1 className='text-[#E6F3FE]'>TEAM</h1>
            <h1 className='text-[#4169E1]'>MAKER</h1>
          </div>
              <form onSubmit={handleSubmit(
                  async(data)=>{  
                    setSubmitted(true)
                    await fetch(`${server_domain}/user/register`, {
                      method: "POST",
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                            name:data.name, 
                            email:data.email, 
                            password:data.password
                          })
                  }).then(response => response)
                    .then(resp=>{
                      if (resp.status===200){
                        fetch(`${server_domain}/user/login`, {
                          method: "POST",
                          credentials: 'include',
                              headers: {
                                  'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({email:data.email, pass:data.password})
                  }).then(response => Promise.all([response.json(), response.status]))
                  .then(([resp, status]) => {
                    if (status === 200){
                      sessionStorage.setItem('groups', JSON.stringify(resp['groups']))
                      navigate('/dashboard')
                    }
                    else{
                      alert('login failed! incorrect email address or password')
                    }   
                  })
                      }
                      else{
                        alert(`An account is already linked to ${data.email}. Please log in or use a different email address`)
                      }
                    }
                  
                    )
                    
                  
                    }
                )} className='relative flex flex-col place-items-center justify-center w-full h-[70%] gap-y-[3%]'>
              <input {...register('name')} className='border-b-4 w-[60%] h-[10%] lg:h-[13%] pl-2 border-b-[#4169E1] bg-[#E6F3FE] text-gray-200 placeholder-gray-200 text-md outline-none rounded-lg bg-opacity-[20%]' type="text" placeholder='name'  required/>
              <p className='text-xs text-[#EE4B2B]'>{errors.name?.message}</p>
              <input {...register('email')} className='border-b-4 w-[60%] h-[10%] lg:h-[13%] pl-2 border-b-[#4169E1] bg-[#E6F3FE] text-gray-200 placeholder-gray-200 text-md outline-none rounded-lg bg-opacity-[20%]' type="email" placeholder='email address' required />
              <p className='text-xs text-[#EE4B2B]'>{errors.email?.message}</p>
              <input {...register('password')} className='border-b-4 w-[60%] h-[10%] lg:h-[13%] pl-2 border-b-[#4169E1] bg-[#E6F3FE] text-gray-200 placeholder-gray-200 text-md outline-none rounded-lg bg-opacity-[20%]' type="password" placeholder='password (6 - 32 characters)' required/>
              <p className='text-xs text-[#EE4B2B]'>{errors.password?.message}</p>
              <input {...register('passwordConfirmation')} className='border-b-4 w-[60%] h-[10%] lg:h-[13%] pl-2 border-b-[#4169E1] bg-[#E6F3FE] text-gray-200 placeholder-gray-200 text-md outline-none rounded-lg bg-opacity-[20%]' type="password" placeholder='confirm password' required/>
              <p className='text-xs text-[#EE4B2B]'>{errors.passwordConfirmation?.message}</p>
              <button type='submit' disabled={submitted} className='bg-[#4169E1] font-semibold w-[60%] h-[10%] lg:h-[13%] text-white rounded-lg'>Register</button>
            </form>
            
            <div className='flex flex-col text-center w-full h-[20%] gap-y-[1%]'>
              <h4 className='text-white text-sm'>Already have an account?</h4>
            <button type='button' onClick={()=>navigate('/login')} className='text-[#4169E1] text-lg font-extrabold'>Log in</button>
            </div>
              </div>
            </div>    
        </div>
        </section>
      </main>
    </>
  );
};

export default Register;
