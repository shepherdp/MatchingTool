import { useContext, useEffect, useRef, useState } from "react"
import { groupContext } from "../helper/group_context"
import LoggedNav from "../components/navbar";
import Footer from "../components/footer";
import { FaRegUserCircle, FaSpinner } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { getCookie } from "../components/queries";
import { useNavigate } from "react-router-dom";
import { FiDelete } from "react-icons/fi";
const MakeTeams=()=> {
    let navigate = useNavigate()
    const {groupName, setGroupName} = useContext(groupContext)
    const options = ['random', 'equal ratings', 'balanced', 'teams with leaders']
    const [restrictions, setRestrictions] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(options[0])
    const [name, setName] = useState('')
    const [size, setSize] = useState(null)
    const [members, setMembers] = useState(null)
    const [restrict1, setRestrict1] = useState('')
    const [restrict2, setRestrict2] = useState('')
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [addRestrictions, setAddRestrictions] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
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
        fetch('https://teammaker.onrender.com/member/getparticipants', {
            method: "POST",
            credentials: 'include',
                headers: {
                    'X-CSRF-TOKEN': getCookie('csrf_access_token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    group_name:sessionStorage.getItem('groupName')})
        }).then(response => response.json()).then(res => {
            setMembers(res['participants']); 
            setRestrictions(res['restrictions'])
        })
    }, [])

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);

    useEffect(()=>{
        const val = sessionStorage.getItem('groupName');
        setGroupName(val)
    }, []);
  return (
    <>
    <main className="h-screen">
        <LoggedNav/>
        <section className="relative bg-[#E6F3FE] min-h-screen">
            <div className="absolute bg-[#4169E1] w-[60%] h-[70%] top-[16%] left-[22%] rounded-lg">
                <div className="absolute flex flex-col place-items-center pt-6 gap-y-8 bg-white w-full h-full -top-[1%] -left-[2%] lg:-top-[2%] lg:-left-[1.5%] rounded-lg shadow-lg shadow-[#4169E1]">
                    <div className="relative w-full h-full flex flex-col">
                        <div className="relative flex flex-col h-[50%] w-[100%] place-items-center pt-6 gap-y-8">
                            <div className="flex flex-col w-[100%] h-[30%] justify-center place-items-center">
                                <h1>Activity Name</h1>
                                <input onChange={(e) => setName(e.target.value)} className="bg-[#E6F3FE] text-gray-700 w-[70%] h-[100%] outline-none pl-2 border-b-2 border-[#4169E1] lg:w-[28%] rounded-lg shadow-md shadow-[#4169E1]" type="text" />
                            </div>
                            <div className="flex flex-col w-[100%] h-[30%] justify-center place-items-center">
                                <h1>Team Size</h1>
                                <input onChange={(e)=> setSize(e.target.value)} className="bg-[#E6F3FE] text-gray-700 w-[70%] h-[100%] outline-none pl-2 border-b-2 border-[#4169E1] lg:w-[28%] rounded-lg shadow-md shadow-[#4169E1]" type="text" />
                            </div>
                            <div className="flex flex-col w-[100%] h-[40%] justify-center place-items-center">
                                <h1 className="absolute top-[67%]">Matching Options</h1>
                                <div ref={optionsRef} className="w-[100%] flex justify-center place-items-center">
                                    <button type="button" onClick={()=>{
                                        if(!isOpen){
                                            handleClick()
                                        }
                                        else{
                                            setIsOpen(false)
                                        }
                                    }} className="absolute h-[20%] w-[70%] lg:w-[28%] flex justify-between pl-6 items-center bg-[#E6F3FE] border-b-2 border-[#4169E1] rounded-lg shadow-md shadow-[#4169E1]">
                                        <div className="w-[80%] flex justify-center place-items-center ml-[5%]">{selected}</div>
                                        {isOpen ? <IoMdArrowDropup className="text-2xl" /> : <IoMdArrowDropdown className="text-2xl" />}
                                    </button>
                                    {
                                    isOpen
                                        && 
                                    <div className="absolute top-[98%] w-[70%] lg:w-[28%] max-h-[50%] z-40 overflow-visible mb-4 rounded-b-lg bg-white bg-opacity-[50%]">
                                        <ul className=" text-black flex flex-col items-center mb-2 gap-y-4">
                                            {options.map((option, i) => (
                                                option != selected &&
                                                <button type="button" onClick={()=>{
                                                    setSelected(option)
                                                    setIsOpen((prev)=>!prev)
                                                }} key={i}  className="w-full h-12 bg-[#E6F3FE] shadow-lg shadow-[#4169E1] flex place-items-center justify-center  hover:text-white hover:bg-[#4169E1] hover:scale-[105%] rounded-lg">
                                                    <li className="">{option}</li>
                                                </button>
                                            ))}
                                        </ul>
                                    </div>   
                                }
                                </div>
                                
                            </div>
                        </div>
                        <div className="w-[100%] h-[20%] flex flex-col justify-center place-items-center mt-[5%]">
                            <button onClick={()=>setAddRestrictions(true)} className="w-[60%] h-[25%] lg:w-[30%] text-white bg-[#4169E1] rounded-lg hover:scale-[105%]">Add Restrictions</button>
                            <h1 className="text-xs text-center pl-6 pr-6 pt-2">This option prevents two participants from being put in the same team</h1>
                            {
                                addRestrictions &&
                                <div className="absolute w-[100%] h-[100%] z-50 flex flex-row top-[0%]">
                                <div className="relative w-full h-full flex flex-col bg-white">
                                   <div className="h-[80%] w-full flex flex-col lg:flex-row">
                                        <div className="h-[50%] w-full lg:h-full lg:w-[70%] flex flex-row">
                                            <div className="w-[45%] h-full flex flex-col justify-center place-items-center gap-y-[4%] lg:gap-y-[1.5%]">
                                                <input type="text" className="w-[80%] h-[15%] lg:h-[10%] bg-[#E6F3FE] text-sm pl-2 outline-none border-b-2 border-[#4169E1] rounded-lg shadow-md shadow-[#4169E1]" placeholder="participant's name" value={restrict1}
                                                onChange={(e)=>{setRestrict1(e.target.value); setOpen1(true)}} />
                                                <ul className="w-[80%] h-[70%] mt-2 z-40 overflow-auto flex flex-col place-items-center gap-y-4">
                                                    {
                                                        members != null && open1 === true &&
                                                        members.map((member, i)=>(
                                                           ( restrict1.length === 0 ||
                                                                (restrict1.length > 0 && member[0].search(RegExp(restrict1, 'i'))) != -1 ) &&
                                                            <li key={i} className="w-full">
                                                               <button type="button" onClick={()=>{
                                                                    setRestrict1(member[0]);
                                                                    setOpen1(false)
                                                               }} className="w-[90%] bg-[#E6F3FE] pb-2 hover:text-white hover:bg-[#4169E1] hover:scale-[105%] delay075 rounded-lg shadow-md shadow-[#4169E1]">
                                                                {member[0]}
                                                                </button> 
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                            <div className="w-[10%] h-[60%] flex flex-col justify-center place-items-center">
                                                <div className="w-full h-[50%] flex justify-center place-items-center"></div>
                                                <div className="w-full h-[50%]">
                                                    <button type="button" onClick={()=>{
                                                        setRestrictions([...restrictions, [restrict1, restrict2, -1]])
                                                        setRestrict1('')
                                                        setRestrict2('')
                                                        setOpen1(false)
                                                        setOpen2(false)
                                                    }} className="w-full h-[30%] text-xs lg:text-sm lg:h-[20%] bg-[#4169E1] text-white rounded-lg hover:scale-[105%]">Add</button>
                                                </div>

                                                </div>

                                            <div className="w-[45%] h-full flex flex-col justify-center place-items-center gap-y-[4%] lg:gap-y-[1.5%]">
                                                <input type="text" className="w-[80%] h-[15%] lg:h-[10%] bg-[#E6F3FE] text-sm pl-2 outline-none border-b-2 border-[#4169E1] rounded-lg shadow-md shadow-[#4169E1]" placeholder="participant's name" value={restrict2}
                                                onChange={(e)=>{setRestrict2(e.target.value); setOpen2(true)}} />
                                                <ul className="w-[80%] h-[70%] z-40 overflow-auto flex flex-col mt-2 place-items-center gap-y-4">
                                                    {
                                                        members != null && open2 === true &&
                                                        members.map((member, i)=>(
                                                            ( restrict2.length === 0 ||
                                                                (restrict2.length > 0 && member[0].search(RegExp(restrict2, 'i'))) != -1 ) &&
                                                            <button type="button" onClick={()=>{
                                                                setRestrict2(member[0]);
                                                                setOpen2(false)
                                                            }} className="w-[90%] bg-[#E6F3FE] pb-2 border-b-2 border-[#4169E1] hover:text-white hover:bg-[#4169E1] hover:scale-[105%] delay-75 rounded-lg shadow-md shadow-[#4169E1]">
                                                                {member[0]}
                                                            </button> 
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="h-[50%] w-full lg:h-full lg:w-[30%] border-t-2 lg:border-t-0 pt-2 lg:border-l-2 border-[#4169E1]">
                                            <ul className="w-full h-full flex flex-col overflow-auto gap-y-4">
                                                {
                                                    restrictions.map((r, i)=>(
                                                        <li key={i} className="w-full flex flex-row gap-x-[5%] justify-center pt-2 pb-2 bg-[#E6F3FE] shadow-md shadow-[#4169E1] overflow-auto rounded-lg">
                                                            <div className="w-[80%] flex flex-row gap-x-[5%] pl-6">
                                                            <h1>{r[0]}</h1>
                                                            <h1> & </h1>
                                                            <h1>{r[1]}</h1>
                                                            </div>
                                                            <button type="button" className="flex justify-center w-[20%] h-auto text-red-600 place-content-end" onClick={()=>{
                                                        
                                                                setRestrictions(restrictions.filter((p)=>{
                                                                    return p !== r;
                                                                }));
                                                            }}><FiDelete className='text-xl'/></button>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                   </div>
                                   <div className="h-[20%] w-full flex justify-center place-items-center">
                                        <button type="button" onClick={()=> setAddRestrictions(false)} className="w-[50%] h-[50%] bg-[#4169E1] text-white text-xl rounded-lg hover:scale-[105%] delay-75">Confirm</button>
                                   </div>
                                </div>
                            </div>
                            }
                        </div>  
                        <div className="w-[100%] h-[20%] flex justify-center place-items-center">
                            <button type="button" className=" h-[50%] w-[50%] bg-[#4169E1] text-white rounded-lg hover:scale-[105%] delay-75 flex flex-row gap-x-3 justify-center place-items-center" onClick={()=>{
                                setIsLoading(true)
                                fetch(`https://teammaker.onrender.com/member/maketeams`, {
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
                                            'matching_option':selected,
                                            'restrictions': restrictions
                                        })
                                })
                                .then(response => response.json()).
                                then(resp => {
                                    sessionStorage.setItem('teams', JSON.stringify(resp['teams']))
                                    sessionStorage.setItem('activity', resp['activity'])
                                })
                                .then(()=> navigate('../../teams'))
                            }}>{!isLoading ? <h1>Generate Teams</h1> : <><FaSpinner className='animate-spin font-extrabold text-2xl text-center text-white'/> <h1>Loading...</h1></>}</button>
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