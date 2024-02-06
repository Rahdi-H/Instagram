import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DASHBOARD, LOGIN, PROFILE } from '../constants/route'
import { useDispatch, useSelector } from 'react-redux'
import { supabase } from '../lib/supabaseConfig'
import { clearUser } from '../context/slices/userSlice'
import { clearProfile } from '../context/slices/profileSlice'

function Header({users}) {
  const user = useSelector((state)=> state.user.user)
  const profile = useSelector((state)=> state.profile.profile)
  const [filteredUsers, setFilteredUsers] = useState(null)
  const [searchUser, setSearchUser] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const signOut = async () => {
    let { error } = await supabase.auth.signOut()
    if (error == null) {
      dispatch(clearUser())
      dispatch(clearProfile())
      navigate(LOGIN)
    }
  }
  async function handleSearch(e) {
    e.preventDefault()
    setSearchUser(e.target.value)
    const filteredUser = users?.filter((user)=> user.username.toLowerCase().includes(searchUser.toLocaleLowerCase()))
    setFilteredUsers(filteredUser)
  }
  const homeClick = () => {
    navigate(DASHBOARD)
  }
  const profileClick = () => {
    navigate(`/profile/${profile.username}`)
  }
  return (
    <>
      <div className='h-16 bg-white border-b-2 border-gray-200 mb-8 relative'>
        <div className='container mx-auto max-w-screen-lg h-full px-2'>
          <div className=' flex justify-between h-full'>
            <div className='text-center flex justify-center items-center cursor-pointer'>
              <Link className='flex justify-center w-auto h-2/4' to={DASHBOARD}>
                <img src="/images/logo.png" alt="instagram logo" />
              </Link>
            </div>
            <div className='flex items-center'>
              <input value={searchUser} type="text" placeholder='Search user' className='px-2 py-1 rounded-lg outline outline-1 outline-slate-400' onChange={handleSearch}/>
              <div className=' cursor-pointer hover:outline outline-1 outline-gray-400 px-2 py-1 ms-1 rounded-lg' onClick={handleSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>

            </div>
            <div className='flex justify-center space-x-2'>
              {user ? 
              <>
              <div onClick={homeClick} className='flex items-center cursor-pointer' title='Home'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <div className='flex justify-center items-center'>
              <div title='Profile' className=' overflow-hidden rounded-full border-2 border-gray-500 w-8 h-8 flex items-center cursor-pointer' onClick={profileClick}>
                <img src={profile?.photo} alt="Profile pic" />
              </div>
              </div>
              <div title='Logout' className='flex items-center cursor-pointer' onClick={signOut}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
              </div>
              </>
              :
              <>
                <div className='flex items-center cursor-pointer' onClick={()=> navigate(LOGIN)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                  </svg>
                </div>
              </>}
            </div>
          </div>
        </div>
        <div className='bg-white border-b-2 border-x-2 border-l-stone-400 -z-0 w-2/3 flex flex-col items-center mx-auto'>
        {searchUser != ''? filteredUsers?.map(user=> (<Link to={`/profile/${user.username}`} key={user.id}><div className=' z-50 flex justify-center' >{user.username}</div></Link>))  : ""}
        </div>
      </div>
    </>
  )
}

export default Header