import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    // console.log(parts)
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  
const PrivateRoute=({children})=>{
    // const cookies = new Cookies()
    const [jwt, setJwt] = useState(null) 
    // const jwt_auth = cookies.get('access_token_cookie')
    // if (!jwt_auth){
    //     return <Navigate to='/login' />
    // };

    const options = {
        method: 'GET',
        credentials: 'same-origin',
        // headers: {
            'X-CSRF-TOKEN': getCookie('csrf_access_token'),
        //     'Content-Type': 'application/json; charset=utf-8',
        //     'Accept': 'application/json'
        // },
    }
    fetch('/user/dashboard', options).then(response=> response)
        .then(resp=> {
            setJwt(resp.status)
        })
   
            
    
    
    return  !jwt ? <br /> : (jwt === 200 ? children : <Navigate to='/login' />)
};

export default PrivateRoute;