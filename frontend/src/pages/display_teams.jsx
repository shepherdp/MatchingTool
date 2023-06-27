import React from 'react'
import LoggedNav from '../components/navbar';
import Footer from '../components/footer';

function DisplayTeams() {
    const teams = ['one', 'two', 'three', 'four', 'five'];
  return (
    <>
       <main className='min-h-sreen'>
        <LoggedNav/>
            <section className='bg-[#E6F3FE] min-h-screen overlfow-scroll'>
                    <ul className='min-w-full max-h-screen overflow-x-hidden flex flex-wrap gap-10 justify-center lg:justify-start lg:pl-12 lg:pr-12 pb-6 pt-6 lg:gap-8 lg:pt-24'>
                        {teams.map((team, i)=>(
                            <div key={i}>
                                <h1 className='w-52 text-center lg:w-64'>Team {i+1}</h1>
                                <div className='w-52 m-h-52 h-52 bg-white lg:w-64 lg:m-h-64 lg:h-64'>
                                    <h1>{team}</h1>
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