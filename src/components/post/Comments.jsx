import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AddComment from './AddComment'

function Comments({photo, commentInput}) {
    const [comments, setComments] = useState(photo.comments)
    const [date, timee] = photo.created_at.split('T')
    const [time, gar] = timee.split('+')
    console.log(date);
    const [commentSlice, setCommentSlice] = useState(3)
    const showNextCommentSlice = () => {
        setCommentSlice(commentSlice + 3)
    }
  return (
    <>
        <div>
            {comments?.slice(0, commentSlice).map((item)=> (
               <p key={`${item.username}--${item.comment}`} className='px-3'>
                    <Link to={`/profile/${item.username}`}>
                        <span className='font-bold cursor-pointer'>{item.username}</span>
                    </Link>
                    <span className='px-2'>{item.comment}</span>
               </p> 
            ))}
            {comments?.length >= 3 && commentSlice < comments?.length &&(
                <button className='px-3' onClick={showNextCommentSlice} onKeyDown={(event)=> {if (event.key === 'Enter'){showNextCommentSlice}}}>
                    View more comments
                </button>
            )}
            <p className='px-3 pb-2'>{`${time} ${date}`} </p>
            <AddComment photo={photo} commentInput={commentInput} comments={comments} setComments={setComments}/>
        </div>
    </>
  )
}

export default Comments;