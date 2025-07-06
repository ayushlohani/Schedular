import {configureStore} from "@reduxjs/toolkit";
import Userslice from "./userSlice";
const store = configureStore({
    reducer:{
        user:Userslice
    }
});

export default store;