import { useState, useEffect } from 'react';


const Test=()=> {
    const [members, setMembers] = useState([])
    
    useEffect(()=>{
        fetch('/add')
        .then(response => response.json())
        .then(data => {setMembers(data.added)}
        )
    }, [])

    return (
        <ul>
            {members.map((d, i)=> <li key={i}>{d}</li>)}
        </ul>

    );
};
export default Test;