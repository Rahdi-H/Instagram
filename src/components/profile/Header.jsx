import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isActiveUserFollowingVisitedUser, toggleFollow } from '../../services/service'
import { PROFILE_EDIT } from '../../constants/route'
import { useNavigate } from 'react-router-dom'

function Header({profile, photosLength, followerCount, setFollowerCount, setEdit, edit}) {
  const ownProfile = useSelector((state)=> state.profile.profile)
  const [isFollowing, setFollowing] = useState(null)
  const navigate = useNavigate()

  async function handleToggle() {
    console.log('clicked');
    const result = await toggleFollow(ownProfile, profile, isFollowing)
    console.log(result);
    if (result == 'SUCCESS'){
      setFollowerCount({followerCount : (isFollowing ? followerCount - 1 : followerCount + 1)})
      setFollowing(!isFollowing)
      console.log('hghg');
    }
  }
  function Edit() {
    setEdit(!edit)
  }

  useEffect(()=> {
    async function isHeFollowing() {
      const follow = await isActiveUserFollowingVisitedUser(ownProfile?.user_id, profile?.user_id)
      setFollowing(follow);
    }
    if (ownProfile?.username != profile?.username) {
      isHeFollowing()
    }
  }, [profile?.username])
  return (
    <div className='flex justify-center space-x-5 px-5'>
      <div className='flex justify-center items-center w-28 h-28 rounded-full'>
          <img src={profile?.photo} alt={profile?.username} />
      </div>
      <div className='flex flex-col justify-center space-y-2'>
        {profile != undefined ? 
        <div className='flex space-x-2 items-center'>
            <h2>{profile?.username}</h2>
            {(profile?.username == ownProfile?.username) ? "": (
              <button onClick={handleToggle} className='px-2 py-1 rounded-md text-white bg-blue-600 hover:bg-blue-500'>{isFollowing ? 'Unfollow': 'Follow'}</button>
              )}
        </div>
        : <h1>Loading...</h1>}
        {profile != undefined ? 
        <div className='flex flex-row space-x-5'>
           <h2>{photosLength} photos</h2>
           <h2>{followerCount} followers</h2>
           <h2>{profile?.following?.length} following</h2>
        </div> : <h1>Loading...</h1>}
        <div className=''>
          <p>Your bio here..</p>
        </div>
      </div>
      {
        ownProfile?.username == profile?.username ?
        <button onClick={Edit}>Edit</button>
        : null
      }
    </div>
  )
}

export default Header