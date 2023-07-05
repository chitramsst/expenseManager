import { configureStore } from "@reduxjs/toolkit";
import phoneNumberSlice from "./slices/login/phoneNumberSlice";
export const loginStore = configureStore({
  reducer: {
    phoneNumber: phoneNumberSlice,
   },
});