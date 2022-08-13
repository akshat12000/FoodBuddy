import { Avatar } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'
import "./UserProfile.css"
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { deleteProfile, loadUser, updateProfile } from '../../Actions/userActions'

const UserProfile = () => {
  const {user} = useSelector((state)=>state.user)
  const [editWindow,setEditWindow] = useState(false)
  const [name,setName] = useState(user.name);
  const [email,setEmail] = useState(user.email);
  const [avatar,setAvatar] = useState(null);
  const dispatch = useDispatch();
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
  const submitHandler = async (e)=>{
      e.preventDefault();
      await dispatch(updateProfile(name,email,avatar));
      alert("Profile Update Successfully")
      dispatch(loadUser());
  }

  const deleteHandler = async ()=>{
    if(window.confirm("Are you sure you want to delete your profile?")){
      await dispatch(deleteProfile());
      alert("Profile Deleted Successfully");
      dispatch(loadUser());
    }
  }

  return (
    <div className='userProfileBox'>
        <h2>User Profile</h2>
        <Avatar src={user.avatar.url} alt="User" style={{margin:"1rem auto"}} sx={{height:"10vmax",width:"10vmax"}}/>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> <span style={user.type==="admin"?{color:"green"}:{color:"blueviolet"}}>{user.type}</span></p>
        <button className="updateBtn" onClick={()=>setEditWindow(!editWindow)}><EditIcon/> <div>Update Profile</div></button>
        <button className="deleteBtn" onClick={deleteHandler}><DeleteIcon/> <div>Delete Profile</div></button>
        {editWindow&&<>
          <div className='overlayDiv'>
              <form onSubmit={submitHandler} className='registerForm'>
                <CloseIcon className='crossBtn' onClick={()=>setEditWindow(!editWindow)}/>
                <h2 style={{fontFamily:"Helvetica"}}>Edit Profile</h2>
                <Avatar src={avatar?avatar:user.avatar.url} alt="User" style={{margin:"1rem auto"}} sx={{height:"10vmax",width:"10vmax"}}/>
                <input className="chooseFile" type="file" accept="image/*" onChange={handleAvatarChange}/>
                <input className="updateForm-input" type="text" name="name" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                <input className="updateForm-input" type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                <button type="submit"> Update</button>
            </form>
          </div>
        </>}
    </div>
  )
}

export default UserProfile