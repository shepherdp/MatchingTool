import { DeleteAcc } from "./delete";

const Footer = () => {
    return (
        <>
            <section className="bg-[#002147] h-[100px] w-screen">
                <div className="w-screen h-[100px] place-content-end">
                    <DeleteAcc />
                    <h1 className="mr-8 text-end text-white">copyright 2023</h1>
                </div>
            </section>
        </>
    )
}

export default Footer;