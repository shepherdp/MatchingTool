import { FaRegUserCircle } from "react-icons/fa";
import LoggedNav from "../components/navbar";
import Footer from "../components/footer";
import { GrLinkNext } from "react-icons/gr";
import { useState } from "react";
import {IoMdArrowDropdown, IoMdArrowDropup} from 'react-icons/io';
import Send from "../components/send_data";

const Type =()=>{
    const options = ['Class', 'Organization', 'Sport', 'Work', 'Friends', 'Team']
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(options[0])

    
    return (
        <>
            <main className="min-h-screen">
                <LoggedNav />
                <section className="min-h-screen bg-[#E6F3FE]">
                   <div className="flex items-center justify-center min-h-screen">
                    <form className="bg-[#E6F3FE] flex justify-center w-1/2 absolute top-1/4 lg:w-max">
                            <div className="flex items-center justify-center -space-x-[460px] -space-y-[16px] pt-[10px] bg-[#E6F3FE] shadow-xl lg:-space-x-[912px] lg:-space-y-[22px]">
                                <div className="w-[450px] h-[520px] bg-[#4169E1] lg:w-[900px]"></div>
                                <div className="w-[450px] h-[520px] bg-white flex flex-col items-center justify-center lg:w-[900px]">
                                    <div className="absolute top-[235px] left-[82px] w-[272px] lg:w-80 mb-2">
                                        <label className="text-gray-700 font-semibold" htmlFor="name">Group Type</label>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="absolute top-[260px] left-[81px]">
                                            <button type="button" onClick={()=>{setIsOpen((prev)=>!prev)}} className="h-12 w-52 flex justify-between pl-2 pr-2 items-center bg-[#E6F3FE] border-b-2 border-[#4169E1] lg:w-64">
                                            {selected}
                                            {isOpen ? <IoMdArrowDropup className="text-2xl" /> : <IoMdArrowDropdown className="text-2xl" />}
                                            </button>
                                            {
                                                isOpen
                                                 && 
                                                <div className="w-52 h-32 overflow-auto border-t-2 border-b-2 cursor-default lg:mt-6 border-[#4169E1] mb-4 lg:w-[400px] lg:h-[400px]">
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
                                        <button type="button" className="absolute top-[260px] left-[289px]" onClick={()=>Send('/addtype', JSON.stringify({type:selected}))}>
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

export default Type;