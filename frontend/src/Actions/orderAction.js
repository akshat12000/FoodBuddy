import axios from "axios"

export const getMyOrders = () => async(dispatch)=>{
    try{
        dispatch({type:"getMyOrdersRequest"})
        const {data} = await axios.get("/api/v1/orders");
        dispatch({type:"getMyOrdersSuccess",payload:data.orders})
    }catch(error){
        dispatch({type:"getMyOrdersFailure",payload:error.message})
    }
}

export const createOrder = (items)=> async(dispatch)=>{
    try{
        dispatch({type:"createOrderRequest"})
        const {data} = await axios.post("/api/v1/order/create",{items});
        dispatch({type:"createOrderSuccess",payload:data.order})
    }catch(error){
        dispatch({type:"createOrderFailure",payload:error.message})
    }
}

export const updateStatusOfOrder = (id,status)=> async(dispatch)=>{
    try{
        dispatch({type:"updateStatusOfOrderRequest"})
        const {data} = await axios.put(`/api/v1/order/update/status/${id}`,{status});
        dispatch({type:"updateStatusOfOrderSuccess",payload:data.order})
    }catch(error){
        dispatch({type:"updateStatusOfOrderFailure",payload:error.message})
    }
}

export const deleteOrder = (id)=> async (dispatch)=>{
    try{
        dispatch({type:"deleteOrderRequest"})
        const {data} = await axios.delete(`/api/v1/order/delete/${id}`);
        dispatch({type:"deleteOrderSuccess",payload:data.message})
    }catch(error){
        dispatch({type:"deleteOrderFailure",payload:error.message})
    }
}

export const rateOrder = (id,rating)=> async (dispatch)=>{
    try{
        dispatch({type:"rateOrderRequest"})
        const {data} = await axios.post(`/api/v1/order/rate/${id}`,{rating});
        dispatch({type:"rateOrderSuccess",payload:data.message})
    }catch(error){
        dispatch({type:"rateOrderFailure",payload:error.message})
    }
}