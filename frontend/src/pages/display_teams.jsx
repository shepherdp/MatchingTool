import React, { useEffect, useState } from 'react'
import LoggedNav from '../components/navbar';
import Footer from '../components/footer';
import { useContext } from 'react';
import { groupContext } from '../helper/group_context';

function DisplayTeams() {
    const {teams, setTeams} = useContext(groupContext)
    const [activity, setActivity] = useState(null)
    useEffect(()=>{
        const temp = JSON.parse(sessionStorage.getItem('teams'))
        setTeams(temp)
        const act = sessionStorage.getItem('activity')
        setActivity(act)
    }, [])
  return (
    <>
       <main className='min-h-sreen'>
        <LoggedNav/>
            <section className=' bg-[#E6F3FE] min-h-screen overlfow-scroll'>
                <div className='w-screen flex justify-center p-8 rounded-lg'>
                    <h1 className=' w-[50%] p-2 bg-white left-[25%] text-center text-2xl rounded-lg'>{activity}</h1>
                </div>
                    <ul className='min-w-full max-h-screen overflow-x-hidden flex flex-wrap gap-10 justify-center lg:justify-start lg:pl-12 lg:pr-8 pb-6 pt-6 lg:gap-8 lg:pt-24'>
                        {teams !== null && teams.map((team, i)=>(
                            <div key={i}>
                                <h1 className='w-52 text-center lg:w-64'>Team {i+1}</h1>
                                <div className='flex justify-center place-items-center w-52 m-h-52 h-52 bg-white border-2 border-[#4169E1] lg:w-64 lg:m-h-64 lg:h-64 rounded-lg shadow-lg shadow-[#4169E1]'>
                                    <ul>
                                        {team.map((name, j)=>(
                                            <li key={j}>
                                                <h1>{name}</h1>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </ul>
            </section>
            <Footer />
       </main>
    </>
  )
}

export default DisplayTeams;


