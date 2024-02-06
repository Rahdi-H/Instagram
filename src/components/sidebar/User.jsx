import React from 'react'
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

const User = ({profile}) => 
!profile ? 
(<Skeleton count={1} height={61} width={200} style={{backgroundColor: "blue"}}/>)
:
(
<Link to={`/profile/${profile?.username}`}>
    <div className='grid grid-cols-4 gap-4 mb-4 items-center'>
        <div className='flex items-center justify-between col-span-1'>
            <img className='rounded-full w-16 flex mr-4' src={profile.photo} alt="Profile Photo" />
        </div>
        <div className=' col-span-3'>
            <h1 className=' font-semibold'>{profile.username}</h1>
            <h2 className=' '>{profile.fullname}</h2>
        </div>
    </div>
</Link>
)

export default User;