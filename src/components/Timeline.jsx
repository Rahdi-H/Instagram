import React, { useEffect, useState } from 'react'
import usePhotos from '../hooks/usePhotos'
import Skeleton from 'react-loading-skeleton';
import Post from './post/Post';
import { supabase } from '../lib/supabaseConfig';
import Profile from './profile/Profile';
import { useSelector } from 'react-redux';

function Timeline() {
  const profile = useSelector((state)=> state.profile.profile)
  const [caption, setCaption]  = useState('')
  const [image, setImage] = useState(null)
  const {photos} = usePhotos()
  console.log(photos);
  async function uploadPost(profile) {
    const {data, error} = await supabase
    .storage 
    .from('Photos')
    .upload(`${profile.user_id}/${image.name}`, image)
    if (data && error == null) {
      const {data: PhotoURL, error } = await supabase
      .storage
      .from('Photos')
      .getPublicUrl(`${profile.user_id}/${image.name}`)
      if (PhotoURL && error == null) {
          const {data, error} = await supabase
          .from('Photos')
          .insert([
            {'user_id': profile.user_id, 'username': profile.username, 'user_photo': profile.photo, 'image_link': PhotoURL.publicUrl, 'caption': caption, 'likes':[], 'comments':[] }
          ])
          .select()
          console.log(data, error);
          window.location.reload()
      }
    }
  }
  useEffect(()=> {
    
  }, [photos])
  return !photos ? (
    <div className='col-span-2 px-2 m-2 p-2 border-2 border-gray-300'>Follow people to see photos</div>
    ) : photos.length > 0 ? (
      <div className=' col-span-2 px-2'>
        <div className='flex justify-center flex-col items-center mb-8'>
          <div className='border-2 border-gray-300 bg-white flex flex-col items-center p-3'>
            <h1>Create Post</h1>
              <div className='flex p-2'>
                  <input className=' focus:outline-none' type="text" value={caption} placeholder='Caption here' onChange={(e)=> setCaption(e.target.value)}/>
                  <input type="file"  id='image' hidden onChange={(e)=> setImage(e.target.files[0])}/>
                  <label htmlFor="image"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                  </label>
              </div>
              {image? 
              <>
                  <img src={URL.createObjectURL(image)}  alt="Post image" className='w-16 h-auto' />
                  <button className='p-2 hover:shadow-md' onClick={()=> uploadPost(profile)}>Post</button>
              </>
                : null}
          </div>
        </div>
      {photos.map((photo)=> (
        <Post key={photo.id} photo={photo}/>
        ))}
    </div>
  ) : <div className='col-span-2 px-2 m-2 p-2 border-2 border-gray-300'>Follow people to see photos</div>
}

export default Timeline