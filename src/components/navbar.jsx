import {RiUserSettingsLine} from 'react-icons/ri'
import { Link } from 'react-router-dom';

const LoggedNav = () => {

    return (
        <>
            <section>
                <header className="justify-start">
                    <div className="flex justify-between min-w-screen bg-[#4169E1]">
                        <Link href="#">
                            <div className="flex min-w-screen ml-12 text-white">
                            <h1 className="text-5xl mt-4  ml-2 font-bold font-display">M</h1>
                        <p className="leading-[18px] mt-[21px] text-center text-xl font-bold font-display">ATCH <br/> AKER</p>
                            </div>
                        </Link>
                        <Link className="mr-12 mt-4 align-middle mb-2 p-2 pt-1 font-semibold" href="#">
                            <RiUserSettingsLine className="w-[26px] h-[26px] text-white"/>
                        </Link>
                    </div>   
                </header>
            </section>
        </>
        
    )
}

export default LoggedNav;