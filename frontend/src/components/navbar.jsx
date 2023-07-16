import {RiUserSettingsLine} from 'react-icons/ri'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getCookie, server_domain } from './queries';
import { DeleteAcc } from './delete';
import { AiOutlineMenu} from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';


const LoggedNav = () => {

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [deleteAcc, setDeleteAcc] = useState(false)
    const componentRef = useRef(null)
    const windowRef = useRef(null)
    const handleClick =()=>{
        setIsOpen(true)
    }

    const handleOutsideClick = (event) => {
        if ((componentRef.current && !componentRef.current.contains(event.target) ) && (windowRef.current && !windowRef.current.contains(event.target))) {
          setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);

    return (
        <>
            <section>
                <header className="justify-start">
                    {isOpen && 
                        <div ref={windowRef} className='absolute z-50 bg-white w-[30%] lg:w-[20%] h-[30%] lg:h-[40%] lg:left-[78.5%] left-[65%] top-[7%] lg:top-[6%] rounded-lg overflow-hidden shadow-lg shadow-[#4169E1] flex flex-col justify-center place-items-center'>
                            <div className='w-full h-[30%] flex justify-center place-items-center'>
                                <button className="w-[60%] h-[34%] lg:h-[30%] bg-[#002147] font-semibold text-white rounded-lg hover:scale-[105%]" onClick={
                                    ()=>{
                                        console.log('clicked')
                                        fetch(`${server_domain}/user/logout`, {
                                        method: "POST",
                                        credentials: 'include',
                                            headers: {
                                                'X-CSRF-TOKEN': getCookie('csrf_access_token'),
                                                'Content-Type': 'application/json'
                                            },
                                    })
                                .then(sessionStorage.clear()).then(navigate('/'))}
                                }>
                                    Logout
                                </button>
                            </div>
                                    <div className='w-full h-[30%] flex justify-center place-items-center text-white'>
                                        <button type='button' className='w-[60%] h-[34%] bg-[#4169E1] rounded-lg font-semibold hover:scale-105 delay-75' onClick={()=>navigate('/aboutteam')}>About Us</button>
                                    </div>
                                    <div className='w-full h-[40%] flex flex-col justify-center place-items-center gap-y-[10%] text-white'>
                                        <button onClick={()=>navigate('/privacy')} className='w-[85%] h-[27%] bg-[#4169E1] rounded-lg text-xs font-semibold hover:scale-105 delay-75'>
                                            Privacy Policy
                                        </button>
                                        <button onClick={()=>{setDeleteAcc(true)}} className='w-[60%] h-[27%] bg-red-400 rounded-lg font-semibold hover:scale-105 delay-75'>
                                            Delete Account
                                        </button>
                                </div>
                        </div> 
                     }
                    {deleteAcc && <div className='w-screen h-screen bg-[#E6F3FE] bg-opacity-[70%] z-50 absolute flex justify-center place-items-center'>
                        <div className='w-[70%] h-[25%] lg:w-[30%] lg:h-[30%] bg-white text-sm rounded-lg overflow-hidden shadow-lg shadow-[#4169E1]'>
                            <div className='w-full h-[50%] text-center flex flex-col justify-center place-items-center font-semibold'>
                                <p>Are you sure you would like to delete your profile?</p>
                                <p>Please note this action is irreversible.</p>
                            </div>
                            <div className='w-full h-[50%] flex flex-row justify-center place-items-center gap-x-[10%]'>
                                <button type='button' onClick={()=>setDeleteAcc(false)} className='w-[35%] h-[50%] bg-[#4169E1] text-white font-semibold rounded-lg hover:scale-105 delay-75'>Cancel</button>
                                <DeleteAcc />
                            </div>
                        </div>
                    </div>}
                    <div className="relative flex justify-between min-w-screen width-screen h-20 bg-[#4169E1]">
                        <button type='button' onClick={()=>navigate('/dashboard')} className='flex flex-row justify-center place-items-center h-full text-white focus:bg-[#4169E1]'>
                            
                                <div className='ml-8 mb-6 border-b-2 border-white'>
                                    <h1 className='font-bold'>TEA</h1>
                                </div>
                                <h1 className="text-5xl font-bold font-display bg-transparent">M</h1>
                                <div className='mt-6 flex align-baseline border-t-2 border-white'>
                                    <h1 className='font-bold'>AKER</h1>
                                </div>
                               
                         
                        </button>
                        <div ref={componentRef} className='h-full flex justify-center'>
                        <button className='text-white text-4xl mr-12 active:bg-inherit' onClick={()=>{
                            if(!isOpen){
                                handleClick();
                            }
                            else{
                                setIsOpen(false)
                            }
                        }}>
                            <AiOutlineMenu />
                        </button>
                        </div>
                        
                    </div> 
                </header>
            </section>
        </>
        
    )
};

export const NonLoggedNav = (props) => {
    const navigate = useNavigate()
    return (
        <>
            <section>
                <header className="justify-start">
                    <div className="relative flex justify-between min-w-screen width-screen h-20 bg-transparent">
                        <button type='button' onClick={()=>navigate('/')} className='flex flex-row justify-center place-items-center h-full text-white focus:bg-transparent'>
                            
                                <div className='ml-8 mb-6 border-b-2 border-white'>
                                    <h1 className='font-bold'>TEA</h1>
                                </div>
                                <h1 className="text-6xl font-bold font-display bg-transparent">M</h1>
                                <div className='mt-8 flex align-baseline border-t-2 border-white'>
                                    <h1 className='font-bold'>AKER</h1>
                                </div>
                         
                        </button>
                        <button className="mr-12 mt-4 align-middle bg-[#002147] mb-6 p-2 pt-1 font-semibold text-white rounded-lg hover:scale-[105%]" onClick={
                            ()=>{
                            navigate(props.direction)}
                        }>
                            {props.name}
                        </button>
                    </div>   
                </header>
            </section>
        </>
        
    )
}

export default LoggedNav;