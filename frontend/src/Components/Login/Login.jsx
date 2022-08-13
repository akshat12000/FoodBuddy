import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch} from "react-redux"
import "./Login.css"
import { loginUser } from '../../Actions/userActions'

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const dispatch = useDispatch()
  const submitHandler = (e)=>{
    e.preventDefault();
    dispatch(loginUser(email,password))
    alert("login successfull")
  }
  return (
    <div>
        <form onSubmit={submitHandler} className='loginForm'>
            <h2 style={{fontFamily:"Helvetica"}}>Login</h2>
            <input required type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
            <input required type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
            <button type="submit">Login</button>
            <Link to="/register">Don't have an account?</Link>
        </form>
    </div>
  )
}

export default Login