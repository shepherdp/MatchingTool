import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }


const PrivateRoute=({children})=>{

    const [jwt, setJwt] = useState(null) 
    const [refreshed, setRefreshed] = useState(null)

    const options = {
        method: 'GET',
        credentials: 'same-origin',
    }

    fetch(`/user/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'X-CSRF-TOKEN': getCookie('csrf_refresh_token'),
            'Content-Type': 'application/json'
        }
    }).then(response => response)
    .then(resp => setRefreshed(resp.ok))

    fetch(`/member/dashboard`, options).then(response=> response)
        .then(resp=> {
            setJwt(resp.status)
        })
   
            
    
    
    return  !jwt ? <br /> : (refreshed === true && jwt === 200 ? children : <Navigate to='/login' />)
};

export default PrivateRoute;