import { FaRegUserCircle } from "react-icons/fa"
import Footer from "../components/footer"
import LoggedNav from "../components/navbar"
import { useEffect, useState } from "react";
import {SendWRes} from '../components/send_data';

const Members = () => {
    const [members, setMembers] = useState([])
    const [newMember, setNewMember] = useState('')

    useEffect(()=>{
        const cached_members = sessionStorage.getItem('members')
        if (cached_members){
            const parsed_members = JSON.parse(cached_members);
            setMembers(parsed_members);
        }
    }, [])
    const AddMember = async( data) =>{
        setMembers(members => [...members, data])
    };


    return (
        <>
            <main className="min-h-screen">
                <LoggedNav />
                <div className="relative min-h-screen h-screen bg-[#E6F3FE]">
                        <div className="absolute w-[60%] h-[60%] top-[22%] left-[20%] bg-[#4169E1]">
                            <div className="relative bg-[#4169E1] w-full h-full">
                                <div className="absolute flex flex-col place-items-center justify-center bg-white w-full h-full -left-[3%] -top-[3%] lg:justify-between lg:-left-[1.5%]">
                                    <div className="w-[100%] h-[80%] flex flex-col justify-center place-items-center lg:flex-row lg:justify-between">
                                        <div className=" w-[70%] flex flex-col lg:w-[20%] lg:place-content-center lg:ml-4">
                                            <div className=" text-gray-700 mb-2">
                                                <label htmlFor="add">Add Participants</label>
                                            </div>
                                            <input className="bg-[#E6F3FE] border-b-2 border-[#4169E1] text-gray-700 pl-2 lg:w-52 lg:h-11 outline-none" type="text" name="add" placeholder="participant's name..." value={newMember} 
                                            onChange={(e) => setNewMember(e.target.value)}/>
                                            <button type='button' onClick={()=>{newMember.length > 0 && 
                                                AddMember(newMember).then(()=>{
                                                    const json_array = JSON.stringify(members);
                                                    sessionStorage.setItem('members', json_array);
                                                    setNewMember('');
                                                }).then( console.log(sessionStorage.getItem('members'))
                                                )}} className=" bg-[#4169E1] text-center mb-2 lg:w-52 lg:h-11 text-white" >Add</button>
                                        </div>
                                        <div className=" w-[70%] max-h-[30%] overflow-auto cursor-default lg:mt-6 mb-4 lg:w-[60%] lg:max-h-[50%] lg:mr-4">
                                            {
                                                members.length > 0 
                                                &&
                                                <ul className="text-black flex flex-col items-center mb-2">
                                                    {members.map((member, i) => (
                                                        <div key={i} className="w-full h-12 bg-[#E6F3FE] border-b-2 border-[#4169E1] flex items-center justify-start pl-4 gap-2">
                                                            <FaRegUserCircle className="w-[24px] h-[24px] text-[#4169E1]"/>
                                                            <li className="text-center ">{member}</li>
                                                        </div>
                                                    ))}
                                                </ul>
                                            }
                                        </div>
                                    </div>
                                    <button className="w-[60%] m-2 ml-2 mr-2 h-12 mb-6 bg-[#4169E1] text-white" type="submit">Create Groups</button>
                                </div>
                            </div>
                            {/* <div className="w-[450px] h-[520px] bg-white flex flex-col items-center lg:w-[900px]">
                                <div className="w-[450px] h-[480px] bg-white flex flex-col items-center justify-center lg:flex-row lg:w-[900px]">
                                    <div className="w-[450px] bg-white flex flex-col items-center justify-center lg:items-start lg:ml-6">
                                        
                                        <div className="w-52 text-gray-700">
                                            <label htmlFor="add">Add Participants</label>
                                        </div>
                                        <input className="w-52 h-12 bg-[#E6F3FE] border-b-2 border-[#4169E1] text-gray-700 pl-2 lg:w-64 outline-none" type="text" name="add" placeholder="participant's name..." value={newMember} 
                                        onChange={(e) => setNewMember(e.target.value)}/>
                                        <button type='button' onClick={()=>{newMember.length > 0 && 
                                            AddMember(newMember).then(()=>{
                                                const json_array = JSON.stringify(members);
                                                sessionStorage.setItem('members', json_array);
                                                setNewMember('');
                                            }).then( console.log(sessionStorage.getItem('members'))
                                            )}} className="w-52 h-12 bg-[#4169E1] text-center mb-2 lg:w-64 text-white" >Add</button>
                                    </div>
                                    <div className="w-52 max-h-60 overflow-auto cursor-default lg:mt-6 mb-4 lg:w-[400px] lg:max-h-[400px]">
                                    {
                                        members.length > 0 
                                        &&
                                        <ul className="text-black flex flex-col items-center mb-2">
                                            {members.map((member, i) => (
                                                <div key={i} className="w-full h-12 bg-[#E6F3FE] border-b-2 border-[#4169E1] flex items-center justify-start pl-4 gap-2">
                                                    <FaRegUserCircle className="w-[24px] h-[24px] text-[#4169E1]"/>
                                                    <li className="text-center ">{member}</li>
                                                </div>
                                            ))}
                                        </ul>
                                        }
                                        </div>
                                </div>
                                <button className="w-[400px] m-2 ml-2 mr-2 h-12 mb-6 bg-[#4169E1] text-white" type="submit">Create Groups</button>
                            </div> */}
                        </div>
                        
                </div>
                <Footer/>
            </main>
        </>
    )
};

export default Members;