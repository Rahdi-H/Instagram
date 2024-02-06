import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { supabase } from '../../lib/supabaseConfig';

function AddComment({photo, commentInput, comments, setComments}) {
    const profile = useSelector((state)=> state.profile.profile)
    const [comment, setComment] = useState('')
    const handleSubmitComment = async (event) => {
        event.preventDefault()
        try {
            const {data, error} = await supabase
            .from('Photos')
            .update({'comments': [...photo?.comments, {'username':profile.username, 'comment': comment}]})
            .eq('id', photo.id)
            .select()
            if (data[0] && error==null){
                setComments([...comments, {'username':profile?.username, 'comment':comment}])
                setComment('')
            }
        } catch (error) {
            alert("Somethis went wrong, Try again")
            console.log(error.message);
        }
    }
  return (
    <div className=' border-t-2 border-gray-300'>
        <form onSubmit={(event) => comment.length > 1 ? handleSubmitComment(event): event.preventDefault()} className='flex justify-stretch'>
            <input ref={commentInput} className='w-full h-full py-2 px-3 focus:outline-none' type="text" placeholder='Add a comment' value={comment} onChange={(e)=> setComment(e.target.value)}/>
            <button disabled={comment.length < 1} onClick={handleSubmitComment} className={`${!comment && 'opacity-25'} cursor-pointer p-2 border-gray-300 hover:outline-2 hover:outline-double hover:outline-gray-300`}>
                Add
            </button>
        </form>

    </div>
  )
}

export default AddComment;