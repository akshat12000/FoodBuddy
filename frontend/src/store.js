import {configureStore} from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/userReducer";
import {restaurantReducer} from "./Reducers/restaurantReducer";
import { orderReducer } from "./Reducers/orderReducer";

const store = configureStore({
    reducer:{
        user:userReducer,
        restaurant:restaurantReducer,
        order:orderReducer
    }
})

export default store;