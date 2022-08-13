import { Avatar } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getARestaurant } from '../../Actions/restaurantAction';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './RestaurantDetails.css'
import { createOrder } from '../../Actions/orderAction';
import Loader from '../Loader/Loader';
import { useAlert } from 'react-alert';

const RestaurantDetails = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [quantity,setQuantity] = React.useState([]);
  const [orderSummaryTab,setOrderSummaryTab] = React.useState(false);
  const [placeOrderTab,setPlaceOrderTab] = React.useState(false);
  const [cost,setCost] = React.useState(0);
  useEffect(()=>{
    dispatch(getARestaurant(id))
  },[dispatch,id])
  const {loading,error,restaurant,message} = useSelector((state)=>state.restaurant)
  useEffect(()=>{
    let arr = Array(restaurant?.menu.length).fill(0);
    setQuantity(arr);
  },[restaurant])
  const increaseQuantity = (ind)=>{
    let arr = [...quantity];
    arr[ind]++;
    setOrderSummaryTab(true)
    setCost((prevCost)=>prevCost+restaurant.menu[ind].price);
    setQuantity(arr);
  }
  const decreaseQuantity = (ind)=>{
    let arr = [...quantity];
    if(arr[ind]!==0){
      setCost((prevCost)=>prevCost-restaurant.menu[ind].price);
    }
    arr[ind]===0?arr[ind]=0:arr[ind]--;
    let flag = false;
    for(let i=0;i<arr.length;i++){
      if(arr[i]){
        flag=true;
      }
    }
    if(!flag){
      setOrderSummaryTab(false)
    }
    setQuantity(arr);
  }

  const placeOrderHandler = async ()=>{
    let items = [];
    for(let i=0;i<restaurant.menu.length;i++){
      if(quantity[i]!==0){
        items.push({
          item:restaurant.menu[i]._id,
          quantity:quantity[i],
        })
      }
    }
    await dispatch(createOrder(items))
    // alert("Order Placed Successfully")
    setPlaceOrderTab(false);
    setOrderSummaryTab(false);
  }
  const {message:orderMsg} = useSelector((state)=>state.order)
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
    <>
      {loading?<Loader/>:<div className='restaurantMainDiv'>
        <Avatar src={restaurant?.coverPhoto?.url} alt="Restaurant" style={{margin:"1rem auto"}} sx={{height:"10vmax",width:"10vmax"}}></Avatar>
        <h2>{restaurant?.name}</h2>
        <p>Address: {restaurant?.address}</p>
        <div className="restaurantMenu">
            <h3>Menu</h3>
            <div className="restaurantMenuDisplay">
                {restaurant?.menu.map((menu,ind)=>(
                    <div key={menu._id} className="restaurantMenuItem">
                        <img src={menu.image.url} alt={menu.name}/>
                        <h4>{menu.name}</h4>
                        <p>{menu.description}</p>
                        <p className='tag'>₹ {menu.price}</p>
                        <div className="orderDiv"><button className='deleteBtn' onClick={()=>increaseQuantity(ind)}><AddIcon/></button>&nbsp;<p>{quantity[ind]}</p><button className='deleteBtn' onClick={()=>decreaseQuantity(ind)}><RemoveIcon/></button></div>
                    </div>
                ))}
            </div>
        </div>
        {orderSummaryTab&&<div className="orderSummary">
                  <div>
                    <p>Cost: ₹{cost}</p>
                    <p>Quantity: {quantity.reduce((a,b)=>a+b,0)}</p>
                  </div>
                  <div>
                    <button className='orderBtn' onClick={()=>setPlaceOrderTab(!placeOrderTab)}><div>Proceed to order</div><ArrowRightAltIcon/></button>
                  </div>
        </div>}
        {
          placeOrderTab&&<div className="overlayDiv">
            <div className='orderSummaryCard'>
                <h1>Order Summary</h1>
                {
                  restaurant.menu.map((menu,ind)=>(
                    quantity[ind]!==0&&<div className='orderCard'>
                        <div className='div-1'>
                          <img src={menu.image.url} alt={menu.name}/>
                        </div>
                        <div className='div-2'>
                          <p>{menu.name}</p>
                          <p>x{quantity[ind]}</p>
                        </div>
                    </div>
                  ))
                }
                <hr/>
                <div className='placeOrderDiv'>
                  <div className='btnDiv'>
                    <button onClick={placeOrderHandler}>Place Order</button>
                    <button className='cancelBtn' onClick={()=>setPlaceOrderTab(!placeOrderTab)}>Cancel</button>
                  </div>
                  <div>
                      <p>Total ₹{cost}</p>
                  </div>
                </div>
            </div>
          </div>
        }
    </div>}
    </>
  )
}

export default RestaurantDetails