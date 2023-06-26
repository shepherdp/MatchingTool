import { useContext, useEffect, useState } from "react"
import { groupContext } from "../helper/group_context"
import LoggedNav from "../components/navbar";
import Footer from "../components/footer";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
const MakeTeams=()=> {
    const {groupName, setGroupName} = useContext(groupContext)
    const options = ['random', 'skill-based', 'option 3', 'option 4']
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(options[0])
    useEffect(()=>{
        const val = sessionStorage.getItem('groupName');
        setGroupName(val)
    }, []);
  return (
    <>
    <main className="h-screen">
        <LoggedNav/>
        <section className="relative bg-[#E6F3FE] min-h-screen">
            <div className="absolute bg-[#4169E1] w-[60%] h-[70%] top-[16%] left-[22%]">
                <div className="absolute flex flex-col place-items-center pt-6 gap-y-8 bg-white w-full h-full -top-[1%] -left-[2%] lg:-top-[2%] lg:-left-[1.5%]">
                    <div className="">
                        <h1>Activity Name</h1>
                        <input className="bg-[#E6F3FE] text-gray-700 w-52 h-12 outline-none pl-2 border-b-2 border-[#4169E1] lg:w-64" type="text" />
                    </div>
                    <div className="">
                        <h1>Team Size</h1>
                        <input className="bg-[#E6F3FE] text-gray-700 w-52 h-12 outline-none pl-2 border-b-2 border-[#4169E1] lg:w-64" type="text" />
                    </div>
                    <div>
                        <h1>Matching Options</h1>
                        <button type="button" onClick={()=>{setIsOpen((prev)=>!prev)}} className="h-12 w-52 flex justify-between pl-2 pr-2 items-center bg-[#E6F3FE] border-b-2 border-[#4169E1] lg:w-64">
                            {selected}
                            {isOpen ? <IoMdArrowDropup className="text-2xl" /> : <IoMdArrowDropdown className="text-2xl" />}
                        </button>
                        {
                            isOpen
                                && 
                            <div className="w-52 h-32 overflow-auto border-t-2 border-b-2 cursor-default border-[#4169E1] mb-4 lg:w-[313px] lg:h-[200px]">
                                <ul className="text-black flex flex-col items-center mb-2">
                                    {options.map((member, i) => (
                                        <button type="button" onClick={()=>{
                                            setSelected(member)
                                            setIsOpen((prev)=>!prev)
                                        }} key={i}  className="w-full h-12 bg-[#E6F3FE] border-b-2 border-[#4169E1] flex items-center justify-start pl-4 gap-2">
                                            <FaRegUserCircle className="w-[24px] h-[24px] text-[#4169E1]"/>
                                            <li className="text-center ">{member}</li>
                                        </button>
                                    ))}
                                </ul>
                            </div>   
                        }
                    </div>
                </div>
                <div>
                    <h1>Matching Restrictions</h1>
                    
                </div>
            </div>
        </section>
        <Footer/>
    </main>
    </>
  )
}

export default MakeTeams;