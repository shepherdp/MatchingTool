import { FaRegUserCircle } from "react-icons/fa"
import Footer from "../components/footer"
import LoggedNav from "../components/navbar"
import { useEffect, useState } from "react";

const Members = () => {
    const [members, setMembers] = useState([])
    const [newMember, setNewMember] = useState('')


    const AddMember = async(path, data) =>{
        const response = await fetch(`http://localhost:5000${path}`, {
            method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
        });
        const result = await response.json();
        setMembers(result);
        setNewMember('')
    };

    return (
        <>
            <main className="min-h-screen">
                <LoggedNav />
                <section className="min-h-screen bg-[#E6F3FE]">
                   <div className="flex items-center justify-center min-h-screen">
                    <form className="bg-[#E6F3FE] flex justify-center w-1/2 absolute top-1/4 lg:w-max">
                            <div className="flex items-center justify-center -space-x-[460px] -space-y-[16px] pt-[10px] bg-[#E6F3FE] shadow-xl lg:-space-x-[912px] lg:-space-y-[22px]">
                                <div className="w-[450px] h-[520px] bg-[#4169E1] lg:w-[900px]"></div>
                                <div className="w-[450px] h-[520px] bg-white flex flex-col items-center lg:w-[900px]">
                                   <div className="w-[450px] h-[480px] bg-white flex flex-col items-center justify-center lg:flex-row lg:w-[900px]">
                                        <div className="w-[450px] bg-white flex flex-col items-center justify-center lg:items-start lg:ml-6">
                                            
                                            <div className="w-52 text-gray-700">
                                                <label htmlFor="add">Add Participants</label>
                                            </div>
                                            <input className="w-52 h-12 bg-[#E6F3FE] border-b-2 border-[#4169E1] text-gray-700 pl-2 lg:w-64 outline-none" type="text" name="add" placeholder="participant's name..." value={newMember} 
                                            onChange={(e) => setNewMember(e.target.value)}/>
                                            <button type='button' onClick={()=>AddMember('/addmember', JSON.stringify({new_member:newMember}))} className="w-52 h-12 bg-[#4169E1] text-center mb-2 lg:w-64 text-white" >Add</button>
                                        </div>
                                        {
                                            members.length > 0 
                                            &&
                                            <div className="w-52 max-h-60 overflow-auto border-t-2 border-b-2 cursor-default lg:mt-6 border-[#4169E1] mb-4 lg:w-[400px] lg:max-h-[400px]">
                                            <ul className="text-black flex flex-col items-center mb-2">
                                                {members.map((member, i) => (
                                                    <div key={i} className="w-full h-12 bg-[#E6F3FE] border-b-2 border-[#4169E1] flex items-center justify-start pl-4 gap-2">
                                                        <FaRegUserCircle className="w-[24px] h-[24px] text-[#4169E1]"/>
                                                        <li className="text-center ">{member}</li>
                                                    </div>
                                                ))}
                                            </ul>
                                        </div>
                                        }
                                   </div>
                                    <button className="w-[400px] m-2 ml-2 mr-2 h-12 mb-6 bg-[#4169E1] text-white" type="submit">Create Groups</button>
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

export default Members;