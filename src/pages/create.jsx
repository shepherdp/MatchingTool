import {FaRegUserCircle} from 'react-icons/fa'
import LoggedNav from '../components/navbar'
import Footer from '../components/footer'
import { useEffect, useState } from 'react';
const Create=()=> {
   var added_names = ['one']
    const [members, setMembers] = useState([{}])
    const [isLoading, setIsLoading] = useState(true)
    const [groupName, setGroupName] = useState('')
    const [newMember, setNewMember] = useState('')
    
    useEffect(()=>{
        fetch('/add')
        .then(response => response.json())
        .then(data => {setMembers(data.added);
        setIsLoading(false)});
    }, [added_names]);

    const addMembers = () => {
        added_names.push(newMember);
        setNewMember('');
        console.log(added_names);
    }

    useEffect(()=>{
        
    })
    return (
        <>
            <head>
                <meta charSet="UTF-8"/>
                <title>Match-Maker</title>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
                <link href="https://fonts.googleapis.com/css2?family=Changa:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet"/>
            </head>
            <main className="min-h-screen">
                <LoggedNav />
                <section className="min-h-screen bg-[#E6F3FE]">
                   <div className="flex items-center justify-center min-h-screen">
                    <form className="bg-[#E6F3FE] flex justify-center w-1/2 absolute top-1/4 lg:w-max">
                            <div className="flex items-center justify-center -space-x-[460px] -space-y-[16px] pt-[10px] bg-[#E6F3FE] shadow-xl lg:-space-x-[912px] lg:-space-y-[22px]">
                                <div className="w-[450px] h-[520px] bg-[#4169E1] lg:w-[900px]"></div>
                                <div className="w-[450px] h-[520px] bg-white flex flex-col items-center lg:w-[900px]">
                                   <div className="w-[450px] h-[480px] bg-white flex flex-col items-center lg:flex-row lg:w-[900px]">
                                        <div className="w-[450px] h-[450px] bg-white flex flex-col items-center lg:items-start lg:ml-6">
                                            <div className="w-52 pt-6">
                                                <label className="text-gray-700" htmlFor="name">Name</label>
                                            </div>
                                            <input className="bg-[#E6F3FE] text-gray-700 w-52 h-12 outline-none pl-2 border-b-2 border-[#4169E1] mb-6 lg:w-64" type="text" name= "name" placeholder="ex: team building, etc..." value={groupName}
                                            onChange={(i) => setGroupName(i.target.value)} />
                                            <div className="w-52">
                                                <label className="text-gray-700" htmlFor="type">Type</label>
                                            </div>
                                            <select className="w-52 h-12 text-gray-700 pl-2 outline-none bg-[#E6F3FE] border-b-2 border-[#4169E1] mb-6 lg:w-64" name="type">
                                                <option>Class</option>
                                                <option>Organization</option>
                                                <option>Sport</option>
                                                <option>Work</option>
                                                <option>Friends</option>
                                                <option>Team</option>
                                            </select>
                                            <div className="w-52 text-gray-700">
                                                <label htmlFor="add">Add Participants</label>
                                            </div>
                                            <input className="w-52 h-12 bg-[#E6F3FE] border-b-2 border-[#4169E1] text-gray-700 pl-2 lg:w-64 outline-none" type="text" name="add" placeholder="participant's name..." value={newMember} 
                                            onChange={(i) => setNewMember(i.target.value)}/>
                                            <button type='button' className="w-52 h-12 bg-[#4169E1] text-center mb-2 lg:w-64" onClick={addMembers}>Add</button>
                                        </div>
                                        <div className="w-52 h-32 overflow-auto border-t-2 border-b-2 cursor-default lg:mt-6 border-[#4169E1] mb-4 lg:w-[400px] lg:h-[400px]">
                                            <ul className="text-black flex flex-col items-center mb-2">
                                                {isLoading===true && <h1>Loading...</h1>}
                                                {added_names.map((member, i) => (
                                                    <div key={i} className="w-full h-12 bg-[#E6F3FE] border-b-2 border-[#4169E1] flex items-center justify-start pl-4 gap-2">
                                                        <FaRegUserCircle className="w-[24px] h-[24px] text-[#4169E1]"/>
                                                        <li className="text-center ">{member}</li>
                                                    </div>
                                                ))}
                                            </ul>
                                        </div>
                                   </div>
                                    <button className="w-[400px] m-2 ml-2 mr-2 h-12 mb-6 bg-[#4169E1]" type="submit">Create Groups</button>
                                </div>
                            </div>
                        </form>
                   </div>
                </section>
                <Footer/>
            </main>
        </>
    );
};

export default Create;