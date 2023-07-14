import { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { server_domain } from '../components/queries';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  
const getData=async()=>{
    console.log(document.cookie)
    // const cookies = new Cookies()
 
    // const jwt_auth = cookies.get('access_token_cookie')
    // if (!jwt_auth){
    //     return <Navigate to='/login' />
    // };

    const options = {
        
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'X-CSRF-TOKEN' : getCookie('csrf_token_cookie'),
            // 'Content-Type': 'application/json'
        //     'Access_Token_Cookie': getCookie('access_token_cookie')
         }
    }
    await fetch(`${server_domain}/user/dashboard`, options).then(response=> response.json())
        .then(resp=> {
            console.log(resp)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    
};

const Test=()=>{
    getData()
}
export default Test;