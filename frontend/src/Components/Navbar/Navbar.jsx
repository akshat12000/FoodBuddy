import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {Avatar} from "@mui/material"
import { loadUser, logoutUser } from '../../Actions/userActions'
import "./Navbar.css"

const Navbar = () => {
    const {user,isAuthenticated} = useSelector((state)=>state.user)
    const dispatch = useDispatch();
const toggleHandler = ()=>{
    document.querySelector(".bi-list")?.addEventListener("click",()=>{
        document.querySelector(".bi-list")?.classList.toggle("visb");
        document.querySelector(".bi-x-lg")?.classList.toggle("visb");
        document.querySelector(".nav-search")?.classList.toggle("visb");
        document.querySelector(".nav-links")?.classList.toggle("visb");
    })
    
    document.querySelector(".bi-x-lg")?.addEventListener("click",()=>{
        document.querySelector(".bi-list")?.classList.toggle("visb");
        document.querySelector(".bi-x-lg")?.classList.toggle("visb");
        document.querySelector(".nav-search")?.classList.toggle("visb");
        document.querySelector(".nav-links")?.classList.toggle("visb");
    })
  }

  const logoutHandler = async ()=>{
    await dispatch(logoutUser());
    alert("Log out successful")
    dispatch(loadUser());
  }

  return (
    <nav>
        <div className='toggler disp'>
            <span><i className="bi bi-list" onClick={toggleHandler} style={{fontSize:"1.2rem"}}></i></span>
            <span><i className="bi bi-x-lg visb" onClick={toggleHandler} style={{fontSize:"1.1rem"}}></i></span>
        </div>
        <div className='nav-brand'><h1><Link to="/">FoodBuddy!</Link></h1></div>
        <div className='nav-search visb'>
            <input type="search" placeholder='Search a restaurant...'/>
        </div>
        {!isAuthenticated?
            <div className='nav-links visb'>
                <ul>
                    <li><Link to="/">Log in</Link></li>
                    <li><Link to="/register">Sign up</Link></li>
                </ul>
            </div>:
            <div className='nav-links visb'>
                <ul>
                    <li><Avatar src={user.avatar.url}/></li>
                    <li><Link to="/profile">{user.name}</Link></li>
                    <li onClick={logoutHandler}>Log out</li>
                </ul>
            </div>
        }
    </nav>
  )
}

export default Navbar