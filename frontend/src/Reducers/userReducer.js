import { createReducer } from "@reduxjs/toolkit";

const initialState = {}

export const userReducer = createReducer(initialState,{
    loginRequest:(state)=>{
        state.loading=true
    },
    loginSuccess:(state,action)=>{
        state.loading=false;
        state.user = action.payload;
        state.isAuthenticated=true;
    },
    loginFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
        state.isAuthenticated=false;
    },
    registerRequest:(state)=>{
        state.loading=true
    },
    registerSuccess:(state,action)=>{
        state.loading=false;
        state.user = action.payload;
        state.isAuthenticated=true;
    },
    registerFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
        state.isAuthenticated=false;
    },
    logoutRequest:(state)=>{
        state.loading = true;
    },
    logoutSuccess:(state)=>{
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
    },
    logoutFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
    },
    loadUserRequest:(state)=>{
        state.loading = true;
    },
    loadUserSuccess:(state,action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    loadUserFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },
    updateProfileRequest:(state)=>{
        state.loading=true;
    },
    updateProfileSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    updateProfileFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    deleteProfileRequest:(state)=>{
        state.loading=true;
    },
    deleteProfileSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    deleteProfileFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearErrors:(state)=>{
        state.error = null;
    },
    clearMessage:(state)=>{
        state.message = null;
    }
})