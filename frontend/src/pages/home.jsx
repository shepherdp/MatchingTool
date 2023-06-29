import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    let navigate = useNavigate();
    const team = ['Zaki', 'Dr. Shepherd', 'Silas', 'Tojo' ]


  return (
    <>
    <main className='w-screen h-screen bg-[#E6F3FE]'>
        <section className='flex w-full h-full justify-center place-items-center'>
            <div className='relative w-[50%] h-[50%] bg-[#4169E1]'>
                <div className=' flex flex-col justify-center place-items-center absolute gap-y-4 w-full h-full bg-white -top-[3%] -left-[3%] lg:-left-[1.5%] lg:-top-[2.5%]'>
                    <input type="text" name="login" placeholder='username' className='bg-[#E6F3FE] pl-2 border-b-2 border-[#4169E1] w-52 h-12' />
                    <input type="password" name="passowrd" placeholder='password' className='bg-[#E6F3FE] pl-2 border-b-2 border-[#4169E1] w-52 h-12' />
                </div>

            </div>

        </section>

    </main>
    
    
    
    </>
  )
}

export default Home;