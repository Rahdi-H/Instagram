import React, { useEffect, useReducer, useState } from 'react'
import Header from './Header'
import Photos from './Photos'
import { supabase } from '../../lib/supabaseConfig'
import ProfileEdit from './ProfileEdit'

function Profile({profile}) {
  const [edit, setEdit] = useState(false)
  const reducer = (state, newState) => ({...state, ...newState})
  const initialState =  {
    Uprofile: {},
    photosCollection: null,
    followerCount: 0
  }
  const [{Uprofile, photosCollection, followerCount }, dispatch] = useReducer(reducer,initialState)
  useEffect(()=> {
      async function getProfileInfoAndPhotos () {
        const {data, error} = await supabase
        .from('Photos')
        .select('*')
        .eq('username', profile?.username)
        if (data && error == null) {
          dispatch({Uprofile: profile, photosCollection: data, followerCount: profile?.followers?.length})
        }
      }
      getProfileInfoAndPhotos()
  }, [profile?.username])
  return (
    <>  
      {edit? <ProfileEdit profile={profile} edit={edit} setEdit={setEdit}/> :
      <>
        <Header edit={edit} setEdit={setEdit} setFollowerCount={dispatch} photosLength={photosCollection ? photosCollection.length : 0} profile={profile} followerCount={followerCount}/>
        <Photos photos={photosCollection}/>
      </>
      }
    </>
  )
}

export default Profile