import LoggedNav from "../components/navbar";
import Footer from "../components/footer";
import {BiPlusMedical} from "react-icons/bi";
import {AiFillEdit} from "react-icons/ai";
import {GiPlayerPrevious} from "react-icons/gi";
import react from 'react'
const  TeamOptions=() =>{
    return(
        <>
        <main className='w-screen h-screen bg-[#E6F3FE]'>
            <LoggedNav />
            <section className="bg-[#E6F3FE] h-screen">
                <div className='relative w-[100%] h-[100%] bg-[#E6F3FE]'>
                    <div className='flex justify-center items-center h-full gap-4'>
                        <button type='button'>
                            <div className='w-[250px] h-[250px] bg-white border-4 border-[#4169E1] flex justify-center items-center text-[#4169E1] text-[90px] hover:text-[100px]'>
                                <BiPlusMedical/>
                            </div>
                        </button>
                        <button type='button'>
                            <div className='w-[250px] h-[250px] bg-white border-4 border-[#4169E1] flex justify-center items-center text-[#4169E1] text-[90px] hover:text-[100px]'>
                                <AiFillEdit/>
                                <span className='text-[#4169E1] text-[24px] mt-2 hover:text-[100px]'>Edit</span>
                            </div>
                        </button>
                        <button type='button'>
                            <div className='w-[250px] h-[250px] bg-white border-4 border-[#4169E1] flex justify-center items-center text-[#4169E1] text-[90px] hover:text-[100px]'>
                                <GiPlayerPrevious/>
                            </div>
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
        </>
    )
};
export default TeamOptions;