import { useNavigate } from "react-router-dom";
import { DeleteAcc } from "./delete";

const Footer = () => {
    const navigate = useNavigate()
    return (
        <>
            <section className="bg-[#002147] h-[5%] w-screen">
                <div className="w-screen h-full flex flex-row justify-between place-content-end">
                    <h1 className="mr-8 text-end text-xs text-white">copyright 2023</h1>
                </div>
            </section>
        </>
    )
}

export default Footer;