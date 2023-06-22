const Display =(name, type)=>{
    return (
        <>
            <button type="button" className=" active:bg-inherit">
                <div className="relative w-[250px] h-[250px] bg-[#4169E1] ml-2 mt-2">
                    <div className="absolute flex flex-col justify-center gap-y-4 place-items-center w-full h-full -top-[3%] -left-[3%] bg-white">
                       <h1 className=" text-4xl font-bold text-[#002147]">{name}</h1>
                       <h3 className="text-lg text-[#002147]">{type}</h3> 
                    </div>
                </div>
            </button>
                
        </>
    )
};

export default Display;