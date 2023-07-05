import { useContext, useEffect, useRef, useState } from "react"
import { groupContext } from "../helper/group_context"
import LoggedNav from "../components/navbar";
import Footer from "../components/footer";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { getCookie } from "../components/queries";
import { useNavigate } from "react-router-dom";
const MakeTeams=()=> {
    let navigate = useNavigate()
    const {groupName, setGroupName} = useContext(groupContext)
    const options = ['random', 'equal ratings', 'balanced', 'teams with leaders']
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(options[0])
    const [name, setName] = useState('')
    const [size, setSize] = useState(null)
    const optionsRef = useRef(null)

    const handleClick =()=>{
        setIsOpen(true)
    }

    const handleOutsideClick = (event) => {
        if (optionsRef.current && !optionsRef.current.contains(event.target)) {
          setIsOpen(false);
        }
    }


    useEffect(()=>{
        const val = sessionStorage.getItem('groupName');
        setGroupName(val)

        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
      
  return (
    <>
    <main className="h-screen">
        <LoggedNav/>
        <section className="relative bg-[#E6F3FE] min-h-screen">
            <div className="absolute bg-[#4169E1] w-[60%] h-[70%] top-[16%] left-[22%]">
                <div className="absolute flex flex-col place-items-center pt-6 gap-y-8 bg-white w-full h-full -top-[1%] -left-[2%] lg:-top-[2%] lg:-left-[1.5%]">
                    <div className="relative w-full h-full flex flex-col">
                        <div className="relative flex flex-col h-[50%] w-[100%] place-items-center pt-6 gap-y-8">
                            <div className="flex flex-col w-[100%] h-[30%] justify-center place-items-center">
                                <h1>Activity Name</h1>
                                <input onChange={(e) => setName(e.target.value)} className="bg-[#E6F3FE] text-gray-700 w-[70%] h-[100%] outline-none pl-2 border-b-2 border-[#4169E1] lg:w-[28%]" type="text" />
                            </div>
                            <div className="flex flex-col w-[100%] h-[30%] justify-center place-items-center">
                                <h1>Team Size</h1>
                                <input onChange={(e)=> setSize(e.target.value)} className="bg-[#E6F3FE] text-gray-700 w-[70%] h-[100%] outline-none pl-2 border-b-2 border-[#4169E1] lg:w-[28%]" type="text" />
                            </div>
                            <div ref={optionsRef} className="flex flex-col w-[100%] h-[40%] justify-center place-items-center">
                                <h1 className="absolute top-[67%]">Matching Options</h1>
                                <button type="button" onClick={()=>{
                                    if(!isOpen){
                                        handleClick()
                                    }
                                    else{
                                        setIsOpen(false)
                                    }
                                }} className="absolute h-[20%] w-[70%] lg:w-[28%] flex justify-between pl-2 items-center bg-[#E6F3FE] border-b-2 border-[#4169E1]">
                                    {selected}
                                    {isOpen ? <IoMdArrowDropup className="text-2xl" /> : <IoMdArrowDropdown className="text-2xl" />}
                                </button>
                                {
                                    isOpen
                                        && 
                                    <div className="absolute top-[95%] w-[28%] h-[50%] z-40 overflow-visible border-t-2 border-b-2 cursor-default border-[#4169E1] mb-4 lg:h-[200px]">
                                        <ul className=" text-black flex flex-col items-center mb-2">
                                            {options.map((member, i) => (
                                                <button type="button" onClick={()=>{
                                                    setSelected(member)
                                                    setIsOpen((prev)=>!prev)
                                                }} key={i}  className="w-full h-12 bg-[#E6F3FE] border-b-2 border-[#4169E1] flex items-center justify-start pl-4 gap-2">
                                                    <li className="text-center ">{member}</li>
                                                </button>
                                            ))}
                                        </ul>
                                    </div>   
                                }
                            </div>
                        </div>
                        <div className="w-[100%] h-[20%] flex justify-center place-items-center mt-[5%]">
                            <h1>Matching Restrictions</h1>
                        </div>  
                        <div className="w-[100%] h-[20%] flex justify-center place-items-center">
                            <button type="button" className=" h-[50%] w-[50%] bg-[#4169E1] text-white" onClick={()=>{
                                fetch(`/member/maketeams`, {
                                    method: "POST",
                                    credentials: 'include',
                                        headers: {
                                            'X-CSRF-TOKEN': getCookie('csrf_access_token'),
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            'group_name':sessionStorage.getItem('groupName'),
                                            'activity_name': name,
                                            'size':size,
                                            'matching_option':selected
                                        })
                                })
                                .then(response => response.json()).
                                then(resp => {
                                    sessionStorage.setItem('teams', JSON.stringify(resp['teams']))
                                    sessionStorage.setItem('activity', resp['activity'])
                                })
                                .then(()=> navigate('../../teams'))
                            }}>Generate Teams</button>
                        </div>

                    </div>
                   
                </div>
                
                
            </div>
        </section>
        <Footer/>
    </main>
    </>
  )
}

export default MakeTeams;