import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
    name:"User",
    initialState:"",
    reducers:{
        loginRole:(store,action)=>{
            return action.payload;
        },
        logoutRole:(store,action)=>{
            return "";
        }
    }
});

export const RoleAction = roleSlice.actions;
export default roleSlice.reducer;