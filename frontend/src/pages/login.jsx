import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useContext } from 'react';
import { groupContext } from '../helper/group_context';
import { NonLoggedNav } from '../components/navbar';
import { getCookie, server_domain } from '../components/queries';
import bg_img from '../images/bg_img.jpg'
import { FaSpinner } from 'react-icons/fa';

function Login() {

  const {groups, setGroups} = useContext(groupContext)
  let navigate = useNavigate()
  const cookies = new Cookies()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [jwt, setJwt] = useState(null) 
  const [clicked, setClicked] = useState(false)

  const options = {
    method: 'POST',
    credentials: 'include',
    headers: {
        'X-CSRF-TOKEN': getCookie('csrf_access_token'),
        'Content-Type': 'application/json'
    }
  }

  useEffect(()=>{
      fetch(`${server_domain}/user/dashboard`, options).then(response=> response)
      .then(resp=> {
          setJwt(resp.status)
      })
  }, [])
  if(jwt != null && jwt===200){
    navigate('/dashboard')
  }
  return (
    <>
      
      <main className="min-h-screen">
        <div className='z-50 fixed w-full'>
        <NonLoggedNav name='Register' direction='/register'/>
        </div>
        <section className='relative flex h-screen w-screen justify-center place-items-center'>
        <img src={bg_img} alt="#" className=' object-cover min-w-screen min-h-screen overflow-clip brightness-50' />
          <div className='absolute flex flex-col justify-center place-items-center w-[70%] h-[60%] lg:w-[25%] lg:h-[55%] rounded-lg shadow-md z-50 bg-gray-700 bg-opacity-[24%] shadow-[#4169E1] pt-6 gap-y-6'>
          <div className='h-[10%] w-full gap-x-[2%] flex flex-row justify-center place-items-center font-bold text-2xl lg:text-4xl'>
            <h1 className='text-[#E6F3FE]'>TEAM</h1>
            <h1 className='text-[#4169E1]'>MAKER</h1>
          </div>
            <div className='w-full h-[70%] flex flex-col gap-y-[10%] justify-center place-items-center'>
            <input onChange={(e)=>setEmail(e.target.value)} className='border-b-4 w-[80%] h-[22%] lg:h-[13%] pl-2 border-b-[#4169E1] bg-[#E6F3FE] text-gray-200 placeholder-gray-400 text-md outline-none rounded-lg bg-opacity-[20%]' type="email" placeholder='email address' />
            <input onChange={(e)=>setPass(e.target.value)} className='border-b-4 w-[80%] h-[22%] lg:h-[13%] pl-2 border-b-[#4169E1] bg-[#E6F3FE] text-gray-200 placeholder-gray-400 text-md outline-none rounded-lg bg-opacity-[20%]' type="password" placeholder='password' />
           
            <div className='w-full h-[50%] lg:h-[30%] flex flex-col justify-normal place-items-center'>
            <button type='button' disabled={clicked} onClick={async()=>{
              setClicked(true)
              await fetch(`${server_domain}/user/login`, {
                method: "POST",
                credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email:email, pass:pass})
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
         
            }} className='bg-[#4169E1] font-semibold w-[80%] h-[50%] lg:h-[50%] rounded-lg mb-4 text-white flex flex-row gap-x-3 justify-center place-items-center'>{!clicked ? <>Login</> : <><FaSpinner className='animate-spin font-extrabold text-2xl text-center text-white'/> <h1>Loading...</h1></>}</button>
            <button type='button' onClick={()=>navigate('/reset')} className='text-blue-300 text-xs'>Forgot password</button>
            </div>
            </div>

            <div className='flex flex-col w-full h-[20%] text-center mb-12'>
              <h4 className='text-gray-200 text-sm'>Not a member yet?</h4>
            <button type='button' onClick={()=>navigate('/register')} className='text-[#4169E1] text-lg font-bold'>Create An Account</button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
