import { createReducer } from "@reduxjs/toolkit";

const initialState = {}

export const orderReducer = createReducer(initialState,{
    getMyOrdersRequest: (state) => {
        state.loading = true;
    },
    getMyOrdersSuccess: (state, action) => {
        state.loading = false;
        state.orders = action.payload;
    },
    getMyOrdersFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    createOrderRequest:(state)=>{
        state.loading=true;
    },
    createOrderSuccess:(state,action)=>{
        state.loading=false;
        state.order=action.payload;
    },
    createOrderFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    updateStatusOfOrderRequest:(state)=>{
        state.loading=true;
    },
    updateStatusOfOrderSuccess:(state,action)=>{
        state.loading=false;
        state.updatedOrder=action.payload;
    },
    updateStatusOfOrderFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    deleteOrderRequest:(state)=>{
        state.loading=true;
    },
    deleteOrderSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    deleteOrderFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    rateOrderRequest:(state)=>{
        state.loading=true;
    },
    rateOrderSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    rateOrderFailure:(state,action)=>{
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