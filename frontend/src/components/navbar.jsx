import {RiUserSettingsLine} from 'react-icons/ri'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getCookie } from './send_data';


const LoggedNav = () => {
    const navigate = useNavigate()
    return (
        <>
            <section>
                <header className="justify-start">
                    <div className="flex justify-between min-w-screen bg-[#4169E1]">
                        <button type='button' onClick={()=>navigate('/dashboard')} className=' focus:bg-[#4169E1]'>
                            <div className="flex min-w-screen ml-12 text-white ">
                                <h1 className="text-5xl mt-4  ml-2 font-bold font-display">M</h1>
                                <p className="leading-[18px] mt-[21px] text-center text-xl font-bold font-display">ATCH <br/> AKER</p>
                            </div>
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
                        .then(navigate('/login'))}
                        }>
                            Logout
                        </button>
                    </div>   
                </header>
            </section>
        </>
        
    )
}

export default LoggedNav;