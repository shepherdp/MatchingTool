import { useContext, useEffect } from "react"
import { groupContext } from "../helper/group_context"
const MakeTeams=()=> {
    const {groupName, setGroupName} = useContext(groupContext)

    useEffect(()=>{
        const val = sessionStorage.getItem('groupName');
        setGroupName(val)
    }, []);
  return (
    <div>{groupName != null && groupName}</div>
  )
}

export default MakeTeams