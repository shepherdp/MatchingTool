import { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { server_domain } from './queries';
import Cookies from 'universal-cookie';

function getCookie(name) {
    // const value = `; ${document.cookie}`;
    // const parts = value.split(`; ${name}=`);
    // if (parts.length === 2) return parts.pop().split(';').shift();
    const cookie = new Cookies()
    return cookie.get(name)
  }


const PrivateRoute=({children})=>{
    const navigate = useNavigate()
    const [jwt, setJwt] = useState(null) 
    console.log(getCookie('csrf_access_token'))
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'X-CSRF-TOKEN': getCookie('csrf_access_token'),
            'Content-Type': 'application/json'
        }
    }

    useEffect(()=>{
        fetch(`${server_domain}/user/dashboard`, options).then(response=> response)
        .then(resp=> {
            setJwt(resp.status)
        })
    }, [])
    
   
            
    
    
    return  jwt === 200 ? children : navigate('/login')
};

export default PrivateRoute;