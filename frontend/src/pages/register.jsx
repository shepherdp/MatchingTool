import { useState } from 'react';
import {FcGoogle} from 'react-icons/fc';
import {Send} from '../components/send_data';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from '../validation/validate_registration';
import {useNavigate} from "react-router-dom";


const Register=()=> {
    let navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
      resolver: yupResolver(schema),
    });

    const onSubmitHandler=(data)=>{
      const name = data.name;
      const email = data.email;
      const password = data.password;
      console.log(name)
      Send('/user/register', JSON.stringify({
        name:name, 
        email:email, 
        password:password
      }));

     reset();
    }

  return (
    <>
      
      <main className="min-h-screen">
        <section>
          <header className='justify-start'>
            <div className=' flex justify-between min-w-screen bg-[#4169E1]'>
              <a href="#">
                <div className=' flex min-w-screen  ml-12 text-white'>
                <h1 className=' text-5xl mt-4  ml-2 font-bold font-displa'>M</h1>
                <p className=' leading-[18px] mt-[21px] text-center text-xl font-bold font-display'>ATCH <br/> AKER</p>
                </div>
              </a>
              <a className='mr-12 mt-4 align-middle bg-[#002147] mb-6 p-2 pt-1 font-semibold text-white' href="#">Login</a>
            </div>
          </header>
        </section>
        <section className='bg-[#E6F3FE] min-h-screen'>
          <div className='h-screen w-screen flex items-center justify-center -space-x-[308px] -space-y-[16px]'>
          <div className='w-[300px] h-[550px] bg-[#4169E1]'></div>
          <div className='flex flex-col place-items-center justify-center w-[300px] h-[550px] bg-white'>
            <form onSubmit={handleSubmit(onSubmitHandler)} className=' flex flex-col place-items-center justify-center w-[300px] bg-white'>
              <input {...register('name')} className='border-b-2 w-52 h-12 border-b-[#4169E1] bg-[#E6F3FE] text-gray-700 text-sm p-2 mt-8 outline-none' type="text" placeholder='name'  required/>
              <p className='text-xs text-[#EE4B2B]'>{errors.name?.message}</p>
              <input {...register('email')} className='border-b-2 w-52 h-12 border-b-[#4169E1] bg-[#E6F3FE] text-gray-700 text-sm p-2 mt-4 outline-none' type="email" placeholder='email address' required />
              <p className='text-xs text-[#EE4B2B]'>{errors.email?.message}</p>
              <input {...register('password')} className='border-b-2 w-52 h-12 border-[#4169E1] bg-[#E6F3FE] text-gray-700 text-sm p-2 mt-4 outline-none' type="password" placeholder='password (6 - 32 characters)' required/>
              <p className='text-xs text-[#EE4B2B]'>{errors.password?.message}</p>
              <input {...register('passwordConfirmation')} className='border-b-2 w-52 h-12 border-[#4169E1] bg-[#E6F3FE] text-gray-700 text-sm p-2 mt-4 outline-none' type="password" placeholder='confirm password' required/>
              <p className='text-xs text-[#EE4B2B]'>{errors.passwordConfirmation?.message}</p>
              {/* changing the login button to link just for testing */}
              <button type='submit' onClick={()=>navigate('/login')} className='bg-[#4169E1] font-semibold w-52 h-12 mt-4 text-white'>Register</button>
            </form>
            <h3 className='text-gray-500 text-xs mt-4'>OR</h3>
            <a href="#">
              <div className='flex border-2 w-52 h-10 border-[#4169E1] rounded-2xl mt-4'>
                <FcGoogle className='ml-2 mt-1.5  w-[24px] h-[24px]'/>
                <h3 className=' text-gray-500 text-xs m-1 ml-6 mr-6 mt-2 font-thin'>Register with Google</h3>
              </div>
            </a>
            <div className='flex flex-col text-center mt-4 mb-8'>
              <h4 className='text-gray-500 text-xs'>Already a member?</h4>
            <a className='text-[#4169E1] text-sm font-bold' href="#">Log in</a>
            </div>
          </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Register;
