import React, { useEffect } from 'react'
import Post from '../post/Post'

function Photos({photos}) {
  useEffect(()=> {
    console.log(photos);
  }, [photos])
  return (
    <div className='flex flex-col my-5 justify-center items-center'>
      <h2 className='p-5'>All your posts are below</h2>
      <div>
        {photos?.map((photo)=> (
          <Post key={`${photo.id}--${photo.caption}`} photo={photo} />
        ))}
      </div>
    </div>
  )
}

export default Photos;