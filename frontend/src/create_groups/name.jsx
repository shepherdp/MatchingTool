import { FaRegUserCircle } from "react-icons/fa";
import Footer from "../components/footer";
import LoggedNav from "../components/navbar";
import { useEffect, useState } from "react";
import {GrLinkNext} from "react-icons/gr";
import {useNavigate} from "react-router-dom";

const Name = () =>{

    const [groupName, setGroupName] = useState('')

    useEffect(()=>{
        const cached_name = sessionStorage.getItem('group_name')
        if (cached_name){
            setGroupName(cached_name)
        }
    }, []);
    
    let navigate = useNavigate();
    const HandleClick=async()=>{
        sessionStorage.setItem('group_name', groupName);
        console.log(sessionStorage.getItem('group_name'))

    }
    return(
        <>
            <main className="min-h-screen">
                <LoggedNav />
                <section className="min-h-screen bg-[#E6F3FE]">
                   <div className="flex items-center justify-center min-h-screen">
                    <form className="bg-[#E6F3FE] flex justify-center w-1/2 absolute top-1/4 lg:w-max">
                            <div className="flex items-center justify-center -space-x-[460px] -space-y-[16px] pt-[10px] bg-[#E6F3FE] shadow-xl lg:-space-x-[912px] lg:-space-y-[22px]">
                                <div className="w-[450px] h-[520px] bg-[#4169E1] lg:w-[900px] rounded-lg"></div>
                                <div className="w-[450px] h-[520px] bg-white flex flex-col items-center justify-center lg:w-[900px] rounded-lg shadow-lg shadow-[#4169E1]">
                                    <div className="w-[272px] lg:w-80 mb-2">
                                        <label className="text-gray-700 font-semibold" htmlFor="name">Group Name</label>
                                    </div>
                                    <div className="flex flex-row">
                                        <input className="bg-[#E6F3FE] text-gray-700 w-52 h-12 outline-none pl-2 border-b-2 border-[#4169E1] lg:w-64 rounded-l-lg shadow-md shadow-[#4169E1]" type="text" name= "name" placeholder="ex: team building, etc..." value={groupName}
                                        onChange={(i) => setGroupName(i.target.value)} />
                                        <button type="button" onClick={()=>{groupName.length > 0 ? HandleClick().then(navigate('../create/type')) : alert('invalid group name')}}>
                                            <div className="h-12 w-16 flex justify-center items-center bg-[#E6F3FE] border-b-2 border-[#4169E1] rounded-r-lg shadow-md shadow-[#4169E1]">
                                                <GrLinkNext className="text-xl font-bold"/>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                   </div>
                </section>
                <Footer/>
            </main>
        </>
    )
};

export default Name;