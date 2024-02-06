import React from 'react'

function Image({photo}) {
  return (
    <div className=' w-96 h-96' >
        <img src={photo.image_link} alt="Image" className=' w-full h-full'/>
    </div>
  )
}

export default Image;