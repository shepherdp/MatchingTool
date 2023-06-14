import { useNavigate } from "react-router-dom";

const SetNavigate=(path)=>{
    let navigate = useNavigate()
    return (
        <>{navigate(path)}</>
    )
};

export default SetNavigate;