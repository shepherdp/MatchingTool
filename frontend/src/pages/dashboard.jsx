import {BiPlusMedical} from "react-icons/bi";
import LoggedNav from "../components/navbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import Display from "../components/displays";
const Dashboard =()=>{
    let navigate = useNavigate()
    const groups = JSON.parse(sessionStorage.getItem('groups'))
    console.log(groups)
    return (
        <main className="w-screen">
            <LoggedNav />
            <section className="bg-[#E6F3FE] min-h-screen">
                <ul className=" min-w-full max-h-screen overflow-x-hidden flex flex-wrap gap-4 justify-center lg:justify-start lg:pl-12 lg:pr-12 pb-6 pt-6 lg:gap-8 lg:pt-24">
                    <li>
                        <button type="button" onClick={()=> navigate('/create/name')}>
                        <div className="w-[250px] h-[250px] bg-white border-4 border-[#4169E1] flex justify-center items-center">
                            <BiPlusMedical  className="text-[#4169E1] text-[90px]"/>
                        </div>
                        </button>
                    </li>
                    <ul>
                        {groups.length > 0 &&  groups.map((group, i)=> (
                            <li key={i}>{Display(group[0], group[1])}</li>
                        ))}
                    </ul>
                </ul>
            </section>
            <Footer />
        </main>
    )
}

export default Dashboard;