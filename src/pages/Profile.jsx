import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import UserProfile from '../components/profile/Profile';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseConfig';
import { NOT_FOUND } from '../constants/route';

function Profile() {
    const {username} = useParams()
    const [users, setUsers] = useState(null)
    const [profile, setProfile] = useState(null)
    const navigate = useNavigate()
    console.log(username);
    useEffect(()=> {
        async function getAllUsers() {
            const {data, error} = await supabase
            .from('Profiles')
            .select('*')
            if (data && error == null) {
              console.log(data);
              setUsers(data)
            }
          }
          getAllUsers()
        async function checkUserExists() {
            try {
                const {data, error} = await supabase
                .from("Profiles")
                .select('*')
                .eq('username', username)
                if (data[0].user_id && error == null) {
                    setProfile(data[0])
                } else {
                    navigate(NOT_FOUND)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        checkUserExists()
    }, [username])
  return (
    <div>
        <Header users={users}/>
        <div className='mx-auto max-w-screen-lg px-3'>
            <UserProfile profile={profile}/>
        </div>
    </div>
  )
}

export default Profile;