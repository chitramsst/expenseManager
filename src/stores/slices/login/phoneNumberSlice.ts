import { createSlice } from "@reduxjs/toolkit";

const initialState : any = {
value: '',
};

//State slice
export const phoneSlice = createSlice({
    name: "phoneNumber",
    initialState,
    reducers: {
    setPhoneNumber: (state,action) => {
        state.value = action.payload;
    },
    },
});
  
// Action creators are automatically generated for each case reducer function 
export const { setPhoneNumber } = phoneSlice.actions;

export default phoneSlice.reducer;