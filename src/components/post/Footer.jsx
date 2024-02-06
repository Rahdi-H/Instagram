import React from 'react'

function Footer({photo}) {
  return (
    <div className='flex px-2 py-1'>
        <h1 className='font-semibold px-1'>{photo.username}</h1>
        <p className='italic'>{photo.caption}</p>
    </div>
  )
}

export default Footer;