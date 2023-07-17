import { FaRegUserCircle } from "react-icons/fa"
import Footer from "../components/footer"
import LoggedNav from "../components/navbar"
import { useEffect, useState } from "react";
import {Send, getCookie, server_domain} from '../components/queries';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { groupContext } from "../helper/group_context";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";

const Members = () => {
    const ratings = [1,2,3,4,5]
    const {setGroups} = useContext(groupContext)
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [members, setMembers] = useState([])
    const [newMember, setNewMember] = useState('')
    const [selected, setSelected] = useState(ratings[2])

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
                                        <div className=" w-[70%] z-40 flex flex-col lg:w-[35%] lg:place-content-center lg:ml-4">
                                            <div className=" text-gray-700 mb-2">
                                                <label htmlFor="add">Add Participants</label>
                                            </div>
                                            <div className="h-12 flex flex-row">
                                                <input className="w-[70%] bg-[#E6F3FE] border-b-2  border-[#4169E1] text-gray-700 pl-2 lg:h-12 outline-none" type="text" name="add" placeholder="participant's name..." value={newMember} 
                                                onChange={(e) => setNewMember(e.target.value)}/>
                                                <div>
                                                    <button type="button" onClick={()=>{setIsOpen((prev)=>!prev)}} className="h-12 flex justify-between overflow-visible pl-2 pr-2 items-center bg-[#E6F3FE] border-b-2 border-[#4169E1]">
                                                    {selected}
                                                    {isOpen ? <IoMdArrowDropup className="text-2xl" /> : <IoMdArrowDropdown className="text-2xl" />}
                                                    </button>
                                                    {
                                                        isOpen
                                                        && 
                                                        <div className="w-12 h-32 z-40 overflow-visible border-t-2  border-b-2 cursor-default border-[#4169E1] mb-4">
                                                            <ul className="text-black flex flex-col items-center mb-2">
                                                                {ratings.map((rating, i) => (
                                                                    <button type="button" onClick={()=>{
                                                                        setSelected(rating)
                                                                        setIsOpen((prev)=>!prev)
                                                                    }} key={i}  className="w-full h-12 bg-[#E6F3FE] border-b-2 border-[#4169E1] flex items-center justify-start pl-4 gap-2">
                                                                        <li className="text-center ">{rating}</li>
                                                                    </button>
                                                                ))}
                                                            </ul>
                                                        </div>   
                                                    }
                                                </div>
                                            </div>
                                            <button type='button' onClick={()=>{newMember.length > 0 && 
                                                AddMember([newMember, selected]).then(()=>{
                                                    const json_array = JSON.stringify(members);
                                                    sessionStorage.setItem('members', json_array);
                                                    setNewMember('');
                                                })}} className="w-[70%] bg-[#4169E1] text-center mb-2 h-11 text-white" >Add</button>
                                        </div>
                                        <div className="static w-[70%] max-h-[40%] overflow-y-scroll cursor-default lg:mt-6 mb-4 lg:w-[60%] lg:max-h-[50%] lg:mr-4">
                                            {
                                                members.length > 0 
                                                &&
                                                <ul className="text-black flex flex-col  mb-2 justify-start">
                                                    {members.map((member, i) => (
                                                        <div key={i} className="w-[70%] h-12 bg-[#E6F3FE] border-b-2 border-[#4169E1] flex items-center justify-start pl-4 gap-2 lg:w-full">
                                                            <FaRegUserCircle className="w-[24px] h-[24px] text-[#4169E1]"/>
                                                            <li className="w-full text-center flex flex-row">
                                                                <h1 className="w-[40%] text-start">{member[0]}</h1>
                                                                <h1 className="w-[20%]">{member[1]}</h1>
                                                                <button type="button" className="flex justify-center w-[30%] h-auto text-red-600" onClick={()=>{
                                                                    setMembers(members.filter((p)=>{
                                                                        return p !== member;
                                                                    }))
                                                                    sessionStorage.setItem('members' ,JSON.stringify(members));
                                                                }}><RiDeleteBin5Line/></button>
                                                            </li>
                                                        </div>
                                                    ))}
                                                </ul>
                                            }
                                        </div>
                                    </div>
                                    <button className="w-[60%] m-2 ml-2 mr-2 h-12 mb-6 bg-[#4169E1] text-white" type="button" onClick={
                                        ()=>{fetch(`${server_domain}/member/createmember`, {
                                            method: "POST",
                                            credentials: 'include',
                                                headers: {
                                                    'X-CSRF-TOKEN': getCookie('csrf_access_token'),
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    name:sessionStorage.getItem('group_name'), 
                                                    type:sessionStorage.getItem('group_type'), 
                                                    participants:members})
                                        })
                                           
                                            .then(
                                                response => Promise.all([response.json(), response.status])
                                            )
                                            .then(
                                                ([resp, status]) => {
                                                    if (status === 200){
                                                        sessionStorage.setItem('groups', JSON.stringify(resp['groups']))
                                                        navigate('../dashboard')
                                                        sessionStorage.removeItem('group_name')
                                                        sessionStorage.removeItem('group_type')
                                                        sessionStorage.removeItem('members')
                                                    }
                                                    else{
                                                        alert('a group of the same name already exists')
                                                    }
                                                }
                                                    
                                            )
                                        }
                                    }>Create Groups</button>
                                </div>
                            </div>
                        </div>     
                </div>
                <Footer/>
            </main>
        </>
    )
};

export default Members;