import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseConfig'
import { LOGIN } from '../constants/route'

function SignUp() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const isInvalid = email === '' || password === '' || username === '' || fullname === ''
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data, error} = await supabase.auth.signUp({
                email: email,
                password: password
            });
            if (error == null && data.user) {
                const { data: {publicUrl} } = supabase
                .storage
                .from('Profile_Pictures')
                .getPublicUrl('instauser.png')
                const {data: profileData, error: profileError} = await supabase
                .from('Profiles')
                .insert([
                    {username: username, fullname: fullname, email: email, photo: publicUrl, user_id: data.user.id }
                ])
                .select();
                console.log(profileData);
                console.log(profileError);
                if (profileData && profileError == null) {
                    alert("Check your email and confirm!")
                    setUsername('')
                    setFullname('')
                    setEmail('')
                    setPassword('')
                } else {
                    setError(profileError.message)
                    setUsername('')
                    setFullname('')
                    setEmail('')
                    setPassword('')
                }
            }
            console.log(data);
            console.log(error);
        } catch (error) {
            setError(error.message)
            setUsername('')
            setFullname('')
            setEmail('')
            setPassword('')
        }
    };
    useEffect(()=> {
        document.title = 'Sign-up - Instagram'
    }, [])
  return (
    <>
        <div className="container flex h-screen max-w-screen-md items-center mx-auto">
            <div className='flex w-3/5'>
                <img src="/images/iphone-with-profile.jpg" alt="" />
            </div>
            <div className='flex flex-col w-2/5'>
                <div className='bg-white border-2 border-gray-300 p-3'>
                    <div className='flex items-center justify-center'>
                        <img src="/images/logo.png" alt="" className='w-3/5'/>
                    </div>
                    {error ? <p className='text-center text-red-700'>{error}</p>: ""}
                    <form onSubmit={handleSubmit}>
                        <input className='w-full border-2 border-gray-400 mt-2 p-2' type="text" placeholder='Enter your username' onChange={(e)=> setUsername(e.target.value)} value={username}/>
                        <input className='w-full border-2 border-gray-400 mt-2 p-2' type="text" placeholder='Enter your full name' onChange={(e)=> setFullname(e.target.value)} value={fullname}/>
                        <input className='w-full border-2 border-gray-400 mt-2 p-2' type="email" placeholder='Enter your email' onChange={(e)=> setEmail(e.target.value)} value={email}/>
                        <input className='w-full border-2 border-gray-400 mt-2 p-2' type="password" placeholder='Enter your password' onChange={(e)=> setPassword(e.target.value)} value={password}/>
                        <input type="submit" value="Sign Up" className={`bg-blue-700 ${isInvalid && ' opacity-50'} p-2 text-white w-full mt-2 cursor-pointer` } disabled={isInvalid}/>
                    </form>
                </div>
                <div className='bg-white border-2 border-gray-300 p-3 mt-2 text-center'>
                    <h3>Already have an account? <Link className=' text-blue-500' to={LOGIN}>Login</Link></h3>
                </div>
            </div>
        </div>
    </>
  )
}

export default SignUp;