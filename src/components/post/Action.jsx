import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { supabase } from '../../lib/supabaseConfig';

function Action({photo, handleFocus}) {
    const profile = useSelector((state)=> state.profile.profile)
    const isLiked = photo?.likes?.includes(profile?.user_id)
    console.log(isLiked); 
    const [toggleLike, setToggleLike] = useState(isLiked)
    const [likes, setLikes] = useState(photo?.likes?.length)
    const handleToggleLike = async () => {
        setToggleLike((isLiked)=> (!isLiked))
        try {
            const {data, error} = await supabase
            .from('Photos')
            .update({
                likes: toggleLike ? [...photo.likes].filter((obj)=> obj != profile?.user_id) : [...photo.likes, profile?.user_id] 
            })
            .eq('id', photo.id)
            .select()
            console.log(data);
            console.log(error);
            if (data[0] && error == null) {
                setLikes((likes)=> (toggleLike ? likes - 1: likes + 1))
            }
            console.log('finished try');
        } catch (error) {
            console.log(error.message);
        }
    }
  return (
    <>
        <div className='flex justify-between p-2'>
            <div className='flex space-x-2'>
                <svg onClick={handleToggleLike} onKeyDown={(event)=> {if (event.key === 'Enter'){handleToggleLike}}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 cursor-pointer  ${toggleLike ? 'fill-red-700 text-red-700': ''} `}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                <svg onClick={handleFocus} onKeyDown={(event)=> {if (event.key === 'Enter'){handleFocus}}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                </svg>

            </div>
            <div>
                <p>{likes === 1 ? `${likes} like`: `${likes} likes`}</p>
            </div>
        </div>
    </>
  )
}

export default Action;