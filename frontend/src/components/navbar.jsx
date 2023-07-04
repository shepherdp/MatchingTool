import {RiUserSettingsLine} from 'react-icons/ri'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getCookie } from './queries';


const LoggedNav = () => {
    const navigate = useNavigate()
    return (
        <>
            <section>
                <header className="justify-start">
                    <div className="relative flex justify-between min-w-screen width-screen h-20 bg-[#4169E1]">
                        <button type='button' onClick={()=>navigate('/dashboard')} className='flex flex-row justify-center place-items-center h-full text-white focus:bg-[#4169E1]'>
                            
                                <div className='ml-8 mb-6 border-b-2 border-white'>
                                    <h1 className='font-bold'>TEA</h1>
                                </div>
                                <h1 className="text-5xl font-bold font-display bg-transparent">M</h1>
                                <div className='mt-6 flex align-baseline border-t-2 border-white'>
                                    <h1 className='font-bold'>AKER</h1>
                                </div>
                               
                                {/* <p className="leading-[18px] mt-[21px] text-center text-xl font-bold font-display">ATCH <br/> AKER</p> */}
                         
                        </button>
                        <button className="mr-12 mt-4 align-middle bg-[#002147] mb-6 p-2 pt-1 font-semibold text-white" onClick={
                            ()=>{fetch(`/user/logout`, {
                                method: "POST",
                                credentials: 'include',
                                    headers: {
                                        'X-CSRF-TOKEN': getCookie('csrf_access_token'),
                                        'Content-Type': 'application/json'
                                    },
                            })
                        .then(sessionStorage.clear()).then(navigate('/login'))}
                        }>
                            Logout
                        </button>
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
                    <div className="relative flex justify-between min-w-screen width-screen h-20 bg-[#4169E1]">
                        <button type='button' onClick={()=>navigate('/dashboard')} className='flex flex-row justify-center place-items-center h-full text-white focus:bg-[#4169E1]'>
                            
                                <div className='ml-8 mb-6 border-b-2 border-white'>
                                    <h1 className='font-bold'>TEA</h1>
                                </div>
                                <h1 className="text-5xl font-bold font-display bg-transparent">M</h1>
                                <div className='mt-6 flex align-baseline border-t-2 border-white'>
                                    <h1 className='font-bold'>AKER</h1>
                                </div>
                               
                                {/* <p className="leading-[18px] mt-[21px] text-center text-xl font-bold font-display">ATCH <br/> AKER</p> */}
                         
                        </button>
                        <button className="mr-12 mt-4 align-middle bg-[#002147] mb-6 p-2 pt-1 font-semibold text-white" onClick={
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