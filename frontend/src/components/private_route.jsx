import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute=({children})=>{
    
    const [jwt, setJwt] = useState(null) 

    if (!sessionStorage.getItem('user_token')){
        return <Navigate to='/login' />
    };

    fetch('http://localhost:5000/user/dashboard', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('user_token')
        }
    }).then(response=> response)
        .then(resp=> {
            setJwt(resp.ok)
        })
   
            
    
    
    return  !jwt ? <br /> : (jwt === true ? children : <Navigate to='/login' />)
};

export default PrivateRoute;