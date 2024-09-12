import { configureStore } from "@reduxjs/toolkit";
import { basketSlice } from "../../features/basket/basketSlice";


export const store=configureStore({
   reducer:{
    basket:basketSlice.reducer
   }

})

 //const AppDispatch=store.dispatch;
//export const useAppDispatch=()=>useDispatch<AppDispatch>()
