import { useState, useEffect } from 'react';


const Test=()=> {
    const [members, setMembers] = useState([])
    
    useEffect(()=>{
            fetch('http://localhost:5000/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name:'tojo', email:'aaaa'})
            });
    }, [])

    return (
        <ul>
            {/* {members.map((d, i)=> <li key={i}>{d}</li>)} */}
        </ul>

    );
};
export default Test;