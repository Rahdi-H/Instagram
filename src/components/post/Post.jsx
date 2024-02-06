import React, { useRef } from 'react'
import Header from './Header';
import Image from './Image';
import Action from './Action';
import Footer from './Footer';
import Comments from './Comments';

function Post({photo}) {
  const commentInput = useRef(null)
  const handleFocus = () => commentInput.current.focus()
  return (
    <div className='flex justify-center mb-8'>
        <div className='border-2 border-gray-300 bg-white'>
            <Header photo={photo}/>
            <Image photo={photo}/>
            <Action photo={photo} handleFocus={handleFocus}/>
            <Footer photo={photo} />
            <Comments photo={photo} commentInput={commentInput}/>
            <div className=''>
                
            </div>
        </div>
    </div>
  )
}

export default Post;