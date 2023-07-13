import React from 'react'
import { useNavigate } from 'react-router-dom';
import { getCookie } from './queries';
import Cookies from 'universal-cookie';

export const DeleteAcc =()=> {
    const cookie = new Cookies();
    const navigate = useNavigate()
  return (
    <>
    <button type='button' onClick={
            ()=> {
                fetch(
                    `user/delete`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'X-CSRF-TOKEN': getCookie('csrf_access_token'),
                    'Content-Type': 'application/json'
                        }
                    }
                ).
                then(sessionStorage.clear()).
                then(cookie.remove('accept_teammaker_cookies')).
                then(navigate('/'))
            }
    } className='text-white w-[35%] h-[50%] bg-red-400 font-semibold rounded-lg hover:scale-105 delay-75'>Delete Account</button>
    </>
  )
};
