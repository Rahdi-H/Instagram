import React from 'react'
import { Link } from 'react-router-dom';

function Header({photo}) {
  return (
      <div className='flex justify-start'>
        <Link to={`/profile/${photo.username}`} className='flex items-center p-2 space-x-2'>
            <img src={photo.user_photo} className='w-5 h-5 rounded-full' alt="user photo" />
            <h2 className='font-bold'>{photo.username}</h2>
        </Link>
    </div>
  )
}

export default Header;