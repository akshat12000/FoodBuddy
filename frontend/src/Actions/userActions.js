import axios from "axios"

export const loginUser = (email,password)=> async (dispatch)=> {
    try{
        dispatch({type:"loginRequest"});
        const {data} = await axios.post("/api/v1/login",{email,password})
        console.log(data.user)
        dispatch({type:"loginSuccess",payload:data.user})
    }catch(error){
        dispatch({type:"loginFailure",payload:error.message})
    }
}

export const registerUser = (name,email,password,type,avatar)=> async (dispatch)=> {
    try{
        dispatch({type:"registerRequest"});
        const {data} = await axios.post("/api/v1/register",{name,email,password,type,avatar},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        console.log(data.user)
        dispatch({type:"registerSuccess",payload:data.user})
    }catch(error){
        dispatch({type:"registerFailure",payload:error.message})
    }
}

export const logoutUser = () => async (dispatch) =>{
    try{
        dispatch({type:"logoutRequest"});
        await axios.get("/api/v1/logout");
        dispatch({type:"logoutSuccess"})
    }catch(error){
        dispatch({type:"logoutFailure",payload:error.message})
    }
}

export const loadUser = () => async (dispatch) =>{
    try{
        dispatch({type:"loadUserRequest"});
        const {data} = await axios.get("/api/v1/profile");
        dispatch({type:"loadUserSuccess",payload:data.user})
    }catch(error){
        dispatch({type:"loadUserFailure",payload:error.message})
    }
}

export const updateProfile = (name,email,avatar) => async (dispatch) =>{
    try{
        dispatch({type:"updateProfileRequest"});
        const {data} = await axios.put("/api/v1/profile/update",{
            name,email,avatar
        },{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({type:"updateProfileSuccess",payload:data.message})
    }catch(error){
        dispatch({type:"updateProfileFailure",payload:error.message})
    }
}

export const deleteProfile = () => async (dispatch) =>{
    try{
        dispatch({type:"deleteProfileRequest"})
        const {data} = await axios.delete("/api/v1/profile/delete");
        dispatch({type:"deleteProfileSuccess",payload:data.message});
    }catch(error){
        dispatch({type:"deleteProfileFailure",payload:error.message})
    }
}