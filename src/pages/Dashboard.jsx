import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Timeline from '../components/Timeline';
import Sidebar from '../components/sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../services/service';
import { supabase } from '../lib/supabaseConfig';

function Dashboard() {
    const [loaded, setLoaded] = useState(false)
    const [users, setUsers] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(()=> {
        document.title = 'Instagram'
        async function getUUser() {
            const user = await getUser(dispatch, navigate)
        }
        const user = getUUser()
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
    }, [loaded])
    return (
    <>
        <div className=''>
            <Header users={users}/>
            <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
                <Timeline/>
                <Sidebar/>
            </div>
        </div>
    </>
  )
}

export default Dashboard;