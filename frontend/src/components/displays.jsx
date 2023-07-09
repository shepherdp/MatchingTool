const Display =(name, type)=>{
    return (
        <>
            
            <div className="relative w-[250px] h-[250px] bg-[#4169E1] ml-2 mt-2 rounded-lg">
                <div className="absolute flex flex-col justify-center gap-y-4 place-items-center w-full h-full -top-[3%] -left-[3%] bg-white hover:-top-[4%] hover:-left-[4%] rounded-lg shadow-lg shadow-[#4169E1]">
                    <h1 className=" text-4xl font-bold text-[#002147]">{name}</h1>
                    <h3 className="text-lg text-[#9b9d9e]">{type}</h3> 
                </div>
            </div>
            
                
        </>
    )
};

export default Display;