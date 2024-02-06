import React, { useEffect } from 'react'

function NotFound() {
    useEffect(()=> {
        document.title = "Not-Found"
    }, [])
  return (
    <div className=' text-center text-5xl'>Not Found!</div>
  )
}

export default NotFound;