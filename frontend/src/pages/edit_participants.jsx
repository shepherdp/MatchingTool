import React, { useState, useEffect, useRef } from 'react'
import LoggedNav from '../components/navbar';
import Footer from '../components/footer';
import {IoMdArrowDropdown, IoMdArrowDropup} from 'react-icons/io'
import {FaRegUserCircle} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import {FiDelete} from 'react-icons/fi'
import { useContext } from 'react';
import { groupContext } from '../helper/group_context';
import { getCookie } from '../components/queries';

const EditParticipants =()=> {
    const [members, setMembers] = useState([])
    const ratings = [1,2,3,4,5]
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const [newMember, setNewMember] = useState('')
    const [selected, setSelected] = useState(ratings[2])
    const componentRef = useRef(null)

    const handleClick =()=>{
        setIsOpen(true)
    }

    const handleOutsideClick = (event) => {
        if (componentRef.current && !componentRef.current.contains(event.target)) {
          setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);

      useEffect(()=>{
        fetch('/member/getparticipants', {
            method: "POST",
            credentials: 'include',
                headers: {
                    'X-CSRF-TOKEN': getCookie('csrf_access_token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    group_name:sessionStorage.getItem('groupName')})
        })).then(response => response.json()).then(res => setMembers(res['participants']))
      }, [])

  return (
    <>
     <main className='min-w-screen min-h-screen bg-[#E6F3FE]'>
        <LoggedNav/>
        <section className='w-screen h-screen flex justify-center place-items-center'>
            <div className='relative bg-[#4169E1] w-[80%] h-[60%]'>
                <div className='absolute w-full h-full bg-white -top-[2%] -left-[2%] lg:-left-[1%]'>
                    <div className='relative w-full h-full'>
                    <div className="w-[100%] h-[80%] flex flex-col justify-center place-items-center lg:flex-row lg:justify-between">
                        <div className=" w-[70%] z-40 flex flex-col lg:w-[35%] lg:place-content-center lg:ml-4">
                            <div className=" text-gray-700 mb-2">
                                <label htmlFor="add">Add Participants</label>
                            </div>
                            <div className="h-12 flex flex-row">
                                <input className="w-[70%] bg-[#E6F3FE] border-b-2  border-[#4169E1] text-gray-700 pl-2 lg:h-12 outline-none" type="text" name="add" placeholder="participant's name..." value={newMember} 
                                onChange={(e) => setNewMember(e.target.value)}/>
                                <div ref={componentRef}>
                                    <button type="button" onClick={()=>{
                                        if(!isOpen){
                                            handleClick()
                                        }
                                        else{
                                            setIsOpen(false)
                                        }
                                    }} className="h-12 flex justify-between overflow-visible pl-2 pr-2 items-center bg-[#E6F3FE] border-b-2 border-[#4169E1]">
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
                            <button type='button' onClick={()=>{setMembers([...members,[newMember, selected]])}} className="w-[70%] bg-[#4169E1] text-center mb-2 h-11 text-white" >Add</button>
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
                                                <ul className="flex flex-row min-w-[20%] text-center gap-x-1">{
                                                    ratings.map((r, j)=> {
                                                        if(r === member[1]){
                                                            return <li key={j} className='w-8 text-center text-white bg-[#4169E1] scale-110 cursor-pointer'>{r}</li>
                                                        }
                                                        else{
                                                            return <button type='button' key={j} className='transition ease-in-out w-8 text-center delay-75 border border-[#4169E1] hover:scale-110 hover:text-white hover:bg-[#4169E1]' onClick={()=>{
                                                                const temp = [...members]
                                                                temp[i][1] = r
                                                                setMembers(temp)
                                                            }}>{r}</button>
                                                        }
                                                        
                                                    })
                                                }</ul>
                                                
                                                <button type="button" className="flex justify-center w-[30%] h-auto text-red-600 place-items-center" onClick={()=>{
                                                    members.filter((p)=>{
                                                        return p !== member;
                                                    })
                                                    sessionStorage.setItem('members' ,JSON.stringify(members));
                                                }}><FiDelete className='text-xl'/></button>
                                            </li>
                                        </div>
                                    ))}
                                </ul>
                            }
                        </div>
                    </div>
                    <div className=' flex w-full max-h-[20%] place-items-center justify-center'>
                    <button className="w-[60%] m-2 ml-2 mr-2 h-12 mb-6 bg-[#4169E1] text-white" type="button" 
                    onClick={
                        ()=>{fetch('/memeber/createmember', {
                            method: "POST",
                            credentials: 'include',
                                headers: {
                                    'X-CSRF-TOKEN': getCookie('csrf_access_token'),
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
 
                                    participants:members, group_name:sessionStorage.getItem('groupName')})
                        })
                            // .then(response => response.json()).then(resp => console.log(resp))
                            .then(
                                response => Promise.all([response.json(), response.status])
                            )
                            .then(
                                ([resp, status]) => {
                                    if (status === 200){
                                        sessionStorage.setItem('groups', JSON.stringify(resp['groups']))
                                        navigate('../dashboard')
                                    }
                                    else{
                                        alert('a group of the same name already exists')
                                    }
                                }
                                    
                            )
                        }
                    }
                    >Save Changes</button>
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

export default EditParticipants;









// const teams = [
//     ['T10', 
    
//     [['one', 'two', 'three'], ['four', 'five', 'six']]
// ], 


// ]

// teams.map((team, i)=>{
//     const name = team[0]
//     const each_team = team[0]
//     each_team.map((t, j)=>{
//         t.map((name, k)=>{
//             <h1>{name}</h1>
//         })
//     })
// })

// const team1_name = team1[0]
// const team1_teams = team1[1]