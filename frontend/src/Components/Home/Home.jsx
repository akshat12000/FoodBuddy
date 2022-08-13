import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteARestaurant, getAllRestaurants } from '../../Actions/restaurantAction';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RestaurantCard from '../RestaurantCard/RestaurantCard';
import "./Home.css"
import { deleteOrder, getMyOrders, rateOrder, updateStatusOfOrder } from '../../Actions/orderAction';
import { useState } from 'react';
import { Rating } from '@mui/material';
import { useAlert } from 'react-alert';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllRestaurants());
    dispatch(getMyOrders());
  },[dispatch])
  const alert = useAlert()
  const color= new Map();
  color['Placed']="red";
  color['On The Way']="yellow";
  color['Delivered']="green";
  const {restaurants,error,message} = useSelector((state)=>state.restaurant)
  const {orders,message:orderMsg} = useSelector((state)=>state.order)
  const {user} = useSelector((state)=>state.user);
  const [status,setStatus]=useState([]);
  useEffect(()=>{
    let arr = Array(orders?.length).fill("");
    for(let i=0;i<orders?.length;i++){
      if(orders[i]?.status==="Placed"){
        arr[i]="Placed";
      }
      else if(orders[i]?.status==="On The Way"){
        arr[i]="On The Way";
      }
      else if(orders[i]?.status==="Delivered"){
        arr[i]="Delivered";
      }
    }
    setStatus(arr)
  },[orders])
  const deleteHandler = async (id)=>{
    if(window.confirm("Are you sure you want to delete this restaurant?")){
      await dispatch(deleteARestaurant(id));
      dispatch(getAllRestaurants());
    }
  }
  const deleteOrderHandler = async (id)=>{
    await dispatch(deleteOrder(id));
    dispatch(getMyOrders())
  }
  const updateStatusHandler = async (id,index)=>{
    await dispatch(updateStatusOfOrder(id,status[index]));
    dispatch(getMyOrders());
  }
  const ratingHandler = async (id,rating)=>{
    await dispatch(rateOrder(id,rating));
    await dispatch(getMyOrders());
    dispatch(getAllRestaurants());
  }
  const statusHandler = (stat,id)=>{
    console.log(status)
    const arr = [...status]
    arr[id]=stat;
    setStatus(arr);
    console.log(status)
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (orderMsg) {
      alert.success(orderMsg);
      dispatch({ type: "clearMessage" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message, alert,orderMsg]);
  return (
    <div className='mainDiv'>
      <div className="restaurantDiv">
        {restaurants?.length>0?
        <>
        <h3 style={{textAlign:"left"}}>Restaurants Recommended For You!</h3>
        <div className='restaurantCardDivContainer'>
          {restaurants&&restaurants.map((restaurant)=>(
            <RestaurantCard key={restaurant._id} deleteHandler={deleteHandler} id={restaurant._id} restaurant={restaurant}/>
          ))}
        </div></>
        :<h3 style={{textAlign:"center"}}>No Restaurants Found!</h3>}
      </div>
      <div className='orderDiv-1'>
          <h3 style={{textAlign:"left"}}>{user.type==="admin"?"All Orders":"Your Orders"}</h3>
          <div className='orderDiv-container'>
            {orders&&orders?.map((items,ind)=>(
              <div className='orderDiv-card'>
                {
                  items?.items.map((item)=>(
                    <div className='order-card'>
                      <div>
                        <img src={item?.item?.image?.url} alt={item?.item?.name}/>
                      </div>
                      <div className='div-desc'>
                        <p>{item?.item?.name}</p>
                        <p>x{item?.quantity}</p>
                        <p>₹{item?.quantity*item?.item?.price}</p>
                      </div>
                    </div>
                  ))
                }
                
                <div>Status: <span style={{color:color[items?.status]}}>{items?.status}</span></div>
                {user.type==="admin"&&items?.status!=="Delivered"&&<div>
                    <select style={{margin:"0.5rem auto"}} value={status[ind]} onChange={(e)=>statusHandler(e.target.value,ind)}>
                      <option value="Placed">Placed</option>
                      <option value="On The Way">On The Way</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <button className='updateBtn' style={{width:"4.5rem"}} onClick={()=>updateStatusHandler(items._id,ind)}>Update</button>
                  </div>}
                {items.status!=="Delivered"&&user._id===items.user&&<button className='deleteBtn' onClick={()=>deleteOrderHandler(items._id)} style={{width:"6.7rem"}}>Cancel Order</button>}
                {items.user===user._id&&items.status==="Delivered"&&<Rating
                  name="simple-controlled"
                  style={{margin:"0.5rem auto"}}
                  value={items.rating}
                  onChange = {(e,newval)=>ratingHandler(items._id,newval)}
                />}
              </div>
            ))}
          </div>
      </div>
      {user.type==="admin"&&<Link className='createBtn sideBtn' to="/restaurant/create"><AddCircleIcon/>&nbsp; <div>Create Restaurant</div></Link>}
    </div>
  )
}

export default Home