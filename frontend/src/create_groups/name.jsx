import { FaRegUserCircle } from "react-icons/fa";
import Footer from "../components/footer";
import LoggedNav from "../components/navbar";
import { useEffect, useState } from "react";
import {GrLinkNext} from "react-icons/gr";
import {useNavigate} from "react-router-dom";
import Send from "../components/send_data";
const Name = () =>{

    const [groupName, setGroupName] = useState('')
    let navigate = useNavigate();
    
    return(
        <>
            <main className="min-h-screen">
                <LoggedNav />
                <section className="min-h-screen bg-[#E6F3FE]">
                   <div className="flex items-center justify-center min-h-screen">
                    <form className="bg-[#E6F3FE] flex justify-center w-1/2 absolute top-1/4 lg:w-max">
                            <div className="flex items-center justify-center -space-x-[460px] -space-y-[16px] pt-[10px] bg-[#E6F3FE] shadow-xl lg:-space-x-[912px] lg:-space-y-[22px]">
                                <div className="w-[450px] h-[520px] bg-[#4169E1] lg:w-[900px]"></div>
                                <div className="w-[450px] h-[520px] bg-white flex flex-col items-center justify-center lg:w-[900px]">
                                    <div className="w-[272px] lg:w-80 mb-2">
                                        <label className="text-gray-700 font-semibold" htmlFor="name">Group Name</label>
                                    </div>
                                    <div className="flex flex-row">
                                        <input className="bg-[#E6F3FE] text-gray-700 w-52 h-12 outline-none pl-2 border-b-2 border-[#4169E1] lg:w-64" type="text" name= "name" placeholder="ex: team building, etc..." value={groupName}
                                        onChange={(i) => setGroupName(i.target.value)} />
                                        <button type="button" onClick={()=>{groupName.length > 0 ? Send('/groupname',JSON.stringify({name:groupName})).then(navigate('../create/type')) : <h1>Invalid</h1>}}>
                                            <div className="h-12 w-16 flex justify-center items-center bg-[#E6F3FE] border-b-2 border-[#4169E1]">
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