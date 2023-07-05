import { createSlice } from "@reduxjs/toolkit";

const initialState : any = {
    userInfo: {},
    userToken: null,
};  

//State slice
export const authSlice = createSlice({
    name: "phoneNumber",
    initialState,
    reducers: {
        setUserToken: (state,action) => {
            state.userToken = action.payload;
        },
        setUserObject: (state,action) => {
            state.userInfo = action.payload;
        },
    },
});
  
// Action creators are automatically generated for each case reducer function 
export const { setUserToken,setUserObject } = authSlice.actions;

export default authSlice.reducer;