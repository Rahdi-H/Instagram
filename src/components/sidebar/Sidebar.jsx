import React from 'react'
import User from './User'
import Suggestions from './Suggestions'
import { useSelector } from 'react-redux'

function Sidebar() {
  const profile = useSelector((state)=> state.profile.profile)
  return (
    <div className='p-4'>
      <User profile={profile}/>
      <Suggestions/>
    </div>
  )
}

export default Sidebar