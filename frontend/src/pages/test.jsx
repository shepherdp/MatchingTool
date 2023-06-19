import { useState } from 'react'
import { Navigate } from 'react-router-dom';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    // console.log(parts)
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  
const Test=()=>{
    // const cookies = new Cookies()
 
    // const jwt_auth = cookies.get('access_token_cookie')
    // if (!jwt_auth){
    //     return <Navigate to='/login' />
    // };

    const options = {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            // 'X-CSRF-TOKEN' : getCookie('csrf_access_token')
            'Content-Type': 'application/json'
        }
    }
    fetch('http://10.16.1.91:5000/user/dashboard', options).then(response=> response.json())
        .then(resp=> {
            console.log(resp)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    
};

export default Test;