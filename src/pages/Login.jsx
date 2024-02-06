import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseConfig'
import { DASHBOARD, SIGN_UP } from '../constants/route'
import { useDispatch } from 'react-redux'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const isInvalid = email === '' || password === ''
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            if (data.user != null && data.session != null) {
                navigate(DASHBOARD)
            } else if (error){
                setError(error.message)
                setEmail('')
                setPassword('')
            }
        } catch (error) {
            console.log(error.message);
            setError(error.message)
            setEmail('')
            setPassword('')
        }
    };
    

    useEffect(()=> {
        document.title = 'Login - Instagram'
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
                        <input className='w-full border-2 border-gray-400 mt-2 p-2' type="email" placeholder='Enter your email' onChange={(e)=> setEmail(e.target.value)} value={email}/>
                        <input className='w-full border-2 border-gray-400 mt-2 p-2' type="password" placeholder='Enter your password' onChange={(e)=> setPassword(e.target.value)} value={password}/>
                        <input type="submit" value="Login" className={`bg-blue-700 ${isInvalid && ' opacity-50'} p-2 text-white w-full mt-2 cursor-pointer` } disabled={isInvalid}/>
                    </form>
                </div>
                <div className='bg-white border-2 border-gray-300 p-3 mt-2 text-center'>
                    <h3>Don't have an account? <Link className=' text-blue-500' to={SIGN_UP}>Sign up</Link></h3>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login