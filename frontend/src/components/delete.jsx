import React from 'react'
import { useNavigate } from 'react-router-dom';
import { getCookie } from './queries';

export const DeleteAcc =()=> {
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
                then(navigate('/register'))
            }
    } className='text-white'>Delete Account</button>
    </>
  )
};
