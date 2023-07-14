import { useNavigate } from "react-router-dom";
import { DeleteAcc } from "./delete";

const Footer = () => {
    const navigate = useNavigate()
    return (
        <>
            <section className="bg-[#002147] h-[100px] w-screen">
                <div className="w-screen h-[100px] flex flex-row justify-between place-content-end">
                    <div className="h-full w-[80%] flex justify-center place-items-center flex-col gap-y-[40%] pl-20">
                    <button type="button" className="text-white" onClick={()=>navigate('/aboutteam')}>About US</button>
                    </div>
                    <h1 className="mr-8 text-end text-xs text-white">copyright 2023</h1>
                </div>
            </section>
        </>
    )
}

export default Footer;