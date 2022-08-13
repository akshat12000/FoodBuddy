import React, { useState } from 'react'
import {Avatar} from "@mui/material"
import {useDispatch} from "react-redux"
import "./Register.css"
import { registerUser } from '../../Actions/userActions'

const Register = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [avatar,setAvatar] = useState("");
  const [type,setType] = useState("user");
  const dispatch = useDispatch()
  const submitHandler = async (e)=>{
    e.preventDefault();
    await dispatch(registerUser(name,email,password,type,avatar))
    alert("Registeration successfull")
  }
  const handleAvatarChange = (e)=>{
    const file= e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = ()=>{
        if(Reader.readyState===2){
            setAvatar(Reader.result);
        }
    }
  }
  return (
    <div>
        <form onSubmit={submitHandler} className='registerForm'>
            <h2 style={{fontFamily:"Helvetica"}}>Register</h2>
            <Avatar src={avatar} alt="User" style={{margin:"1rem auto"}} sx={{height:"10vmax",width:"10vmax"}}/>
            <input className="chooseFile" type="file" accept="image/*" onChange={handleAvatarChange}/>
            <input required className="registerForm-input" type="text" name="name" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
            <input required className="registerForm-input" type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
            <input required className="registerForm-input" type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
            <select required name="type" value={type} onChange={(e)=>setType(e.target.value)} id="type">
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select>
            <button type="submit">Register</button>
        </form>
    </div>
  )
}

export default Register