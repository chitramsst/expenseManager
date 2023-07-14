import { createSlice } from "@reduxjs/toolkit";

const initialState : any = {
    isSyncing: 'NO',
};  

//State slice
export const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        setSyncing: (state,action) => {
            state.isSyncing = action.payload;
        },
    },
});
  
// Action creators are automatically generated for each case reducer function 
export const { setSyncing } = appSlice.actions;

export default appSlice.reducer;