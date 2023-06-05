import {FcGoogle} from 'react-icons/fc';
function Login() {
  return (
    <>
      <head>
        <meta charSet='UTF-8'/>
        <title>Match-Maker</title>
        <link rel="icon" href="../app/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Changa:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet"/>

      </head>
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
            <a className='mr-12 mt-4 align-middle bg-[#002147] mb-6 p-2 pt-1 font-semibold text-white' href="#">Register</a>
          </div>
        </header>
      </section>
      <section className='bg-[#E6F3FE] min-h-screen'>
        <div className='h-screen w-screen flex items-center justify-center -space-x-[308px] -space-y-[16px]'>
        <div className='w-[300px] h-[450px] bg-[#4169E1]'></div>
        <div className='flex flex-col gap-y-3 place-items-center justify-center w-[300px] h-[450px] bg-white'>
          <input className='border-b-2 w-52 h-12 border-b-[#4169E1] bg-[#E6F3FE] text-gray-700 text-sm p-2 mt-12 mb-4 outline-none' type="email" placeholder='email address' />
          <input className='border-b-2 w-52 h-12 border-[#4169E1] bg-[#E6F3FE] text-gray-700 text-sm p-2 mb-4 outline-none' type="password" placeholder='password' />
          {/* changing the login button to link just for testing */}
          <button className='bg-[#4169E1] font-semibold w-52 h-12 mb-4 text-white'>Login</button>
          <h3 className='text-gray-500 text-xs mb-4'>OR</h3>
          <a href="#">
            <div className='flex border-2 w-52 h-10 border-[#4169E1] rounded-2xl mb-4'>
              <FcGoogle className='ml-2 mt-1.5  w-[24px] h-[24px]'/>
              <h3 className=' text-gray-500 text-sm m-1 ml-6 mr-6 mt-2 font-thin'>Log in with Google</h3>
            </div>
          </a>
          <div className='flex flex-col text-center mb-12'>
            <h4 className='text-gray-500 text-xs'>Not a member yet?</h4>
          <a className='text-[#4169E1] text-sm font-bold' href="#">Create An Account</a>
          </div>
        </div>
        </div>
      </section>
    </main>
    </>
  );
};

export default Login;
