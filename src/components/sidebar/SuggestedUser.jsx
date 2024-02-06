import React, { useState } from 'react'
import { getProfiles, getUser, updateUserFollowings, updateUserFollwers } from '../../services/service'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function SuggestedUser({profile, setProfiles}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isFollowing, setIsFollowing] = useState(false)
  const ownProfile = useSelector((state)=> state.profile.profile)
  const handleFollow = async () => {
    await updateUserFollwers(profile, ownProfile, false)
    await updateUserFollowings(profile, ownProfile, false)
    setIsFollowing(true)
    getProfiles(profile, setProfiles)
    getUser(dispatch, navigate)
  }
  return ( 
    <div className='flex justify-between items-center p-2'>
      <div className='flex items-center justify-center space-x-2'>
        <img className='w-8 h-8 rounded-full' src={profile.photo} alt="profile photo" />
        <h2>{profile.username}</h2>
      </div>
      <div>
        <button onClick={handleFollow} className='text-blue-500 font-semibold'>Follow</button>
      </div>
    </div>
  )
}

export default SuggestedUser;