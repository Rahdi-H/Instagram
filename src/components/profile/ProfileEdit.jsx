import React, { useState } from 'react'
import Header from '../Header'
import { supabase } from '../../lib/supabaseConfig';

function ProfileEdit({edit, setEdit, profile}) {
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null)
  console.log(image);
  async function changePhoto() {
    const {data, error} = await supabase
    .storage
    .from("Profile_Pictures")
    .upload(`${profile.user_id}/${image.name}`, image)
    if (data && error == null) {
      const {data: photoURL, error} = await supabase
      .storage
      .from("Profile_Pictures")
      .getPublicUrl(`${profile.user_id}/${image.name}`)
      if (photoURL && error == null){
        const {data: uploaded, error} = await supabase
        .from('Profiles')
        .update({photo: photoURL.publicUrl})
        .eq('username', profile.username)
        .select()
        console.log(uploaded, error);
        if (uploaded && error == null) {

          console.log(data);
          window.location.reload()
        }
      }
    } else {
      setError(error.message)
    }
  }
  return (
    <div>
        <button onClick={()=> setEdit(!edit)} className='hover:bg-white hover:shadow-md p-2 rounded-md'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
        </button>
        <div className='mt-3 flex items-center justify-center'>
            <div>
              {image ? <>{error? <><div>{error}</div></>: null}<img src={URL.createObjectURL(image)} alt="New Photo" className='w-auto h-20'/><button onClick={changePhoto} className='p-2 hover:shadow-lg '>Save</button></> :
               <img src={profile.photo} alt="Profile Picture" className='w-auto h-20' />
               }
            </div>
            <input type="file" id='image' hidden onChange={(e)=> setImage(e.target.files[0])}/>
            <label htmlFor="image" className='cursor-pointer p-2 hover:shadow-md m-2'>Change Picture</label>
        </div>
    </div>
  )
}

export default ProfileEdit