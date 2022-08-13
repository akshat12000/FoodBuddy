import axios from "axios"

export const getAllRestaurants = ()=> async(dispatch)=>{
    try{
        dispatch({type:"getRestaurantsRequest"})
        const {data} = await axios.get("/api/v1/restaurants");
        dispatch({type:"getRestaurantsSuccess",payload:data.restaurants})
    }catch(error){
        dispatch({type:"getRestaurantsFailure",payload:error.message})
    }
}

export const getARestaurant = (id) => async(dispatch)=>{
    try{
        dispatch({type:"getRestaurantRequest"})
        const {data} = await axios.get(`/api/v1/restaurant/${id}`);
        dispatch({type:"getRestaurantSuccess",payload:data.restaurant})
    }catch(error){
        dispatch({type:"getRestaurantFailure",payload:error.message})
    }
}

export const createARestaurant = (name,address,coverPhoto,menu)=> async(dispatch)=>{
    try{
        dispatch({type:"createRestaurantRequest"})
        const {data} = await axios.post("/api/v1/restaurant/create",{name,address,coverPhoto,menu});
        dispatch({type:"createRestaurantSuccess",payload:data.restaurant})
    }catch(error){
        dispatch({type:"createRestaurantFailure",payload:error.message})
    }
}

export const updateMenuItem = (id,name,price,image,category) => async(dispatch)=>{
    try{
        dispatch({type:"updateMenuRequest"})
        const {data} = await axios.put(`/api/v1/restaurant/menu/update/${id}`,{name,price,image,category});
        dispatch({type:"updateMenuSuccess",payload:data.item})
    }catch(error){
        dispatch({type:"updateMenuFailure",payload:error.message})
    }
}

export const updateRestaurant = (id,name,address,coverPhoto) => async(dispatch)=>{
    try{
        dispatch({type:"updateRestaurantRequest"})
        const {data} = await axios.put(`/api/v1/restaurant/${id}`,{name,address,coverPhoto});
        dispatch({type:"updateRestaurantSuccess",payload:data.restaurant})
    }catch(error){
        dispatch({type:"updateRestaurantFailure",payload:error.message})
    }
}   

export const getAMenuItem = (id) => async(dispatch)=>{
    try{
        dispatch({type:"getAMenuRequest"});
        const {data} = await axios.get(`/api/v1/restaurant/menu/${id}`);
        dispatch({type:"getAMenuSuccess",payload:data.item})
    }catch(error){
        dispatch({type:"getAMenuFailure",payload:error.message})
    }
}

export const deleteMenuItem = (id) => async(dispatch)=>{
    try{
        dispatch({type:"deleteMenuRequest"})
        const {data} = await axios.delete(`/api/v1/restaurant/menu/delete/${id}`);
        dispatch({type:"deleteMenuSuccess",payload:data.message})
    }catch(error){
        dispatch({type:"deleteMenuFailure",payload:error.message})
    }
}

export const createMenuItem = (id,name,price,image,category)=> async(dispatch)=>{
    try{
        dispatch({type:"createMenuRequest"})
        const {data} = await axios.post(`/api/v1/restaurant/menu/create/${id}`,{name,price,image,category});
        dispatch({type:"createMenuSuccess",payload:data.item})
    }catch(error){
        dispatch({type:"createMenuFailure",payload:error.message})
    }
}

export const deleteARestaurant = (id) => async (dispatch)=>{
    try{
        dispatch({type:"deleteRestaurantRequest"})
        const {data} = await axios.delete(`/api/v1/restaurant/${id}`);
        dispatch({type:"deleteRestaurantSuccess",payload:data.message})
    }catch(error){
        dispatch({type:"deleteRestaurantFailure",payload:error.message})
    }
}