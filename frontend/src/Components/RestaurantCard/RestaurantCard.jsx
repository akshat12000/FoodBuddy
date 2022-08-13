import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import "./RestaurantCard.css"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Rating } from '@mui/material';
import { useEffect } from 'react';

const RestaurantCard = ({restaurant,id,deleteHandler}) => {
  const {user} = useSelector(state=>state.user)
  const [rating,setRating]=useState(0);
  useEffect(()=>{
    let rate=0;
    for(let i=0;i<restaurant.ratings.length;i++){
        rate+=restaurant.ratings[i].rating;
    }
    setRating(rate)
  },[restaurant])
  return (
    <div className='restaurantCardDiv'>
        <img src={restaurant.coverPhoto.url} alt={restaurant.name}/>
        <h3><Link to={`/restaurant/${id}`}>{restaurant.name}</Link></h3>
        <p>{restaurant.address}</p>
        {
          user.type==="admin"&&
          <div className='optionsDiv'><Link to={`/restaurant/update/${restaurant._id}`}><EditIcon style={{backgroundColor:"#5794f7",color:"white",boxShadow: "0px 0px 5px rgb(213, 212, 212)",cursor:"pointer",position:"relative",top:"0.1rem"}}/></Link>&nbsp;<DeleteIcon onClick={()=>deleteHandler(id)} style={{backgroundColor:"#fc475c",color:"white",boxShadow: "0px 0px 5px rgb(213, 212, 212)",cursor:"pointer"}}/></div>
        }
        <Rating
          name="read-only"
          value={restaurant.ratings.length===0?0:rating/restaurant.noRated}
          readOnly
        />
        <p>No of Reviews: {restaurant.noRated}</p>
    </div>
  )
}

export default RestaurantCard