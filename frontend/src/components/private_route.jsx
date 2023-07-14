import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }


const PrivateRoute=({children})=>{
    const navigate = useNavigate()
    const [jwt, setJwt] = useState(null) 
    const [refreshed, setRefreshed] = useState(null)

    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'X-CSRF-TOKEN': getCookie('csrf_access_token'),
            'Content-Type': 'application/json'
        }
    }

    useEffect(()=>{
        fetch(`https://teammaker.onrender.com/user/dashboard`, options).then(response=> response)
        .then(resp=> {
            setJwt(resp.status)
        })
    }, [])
    
   
            
    
    
    return  jwt === 200 ? children : navigate('/login')
};

export default PrivateRoute;