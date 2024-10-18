import { configureStore } from "@reduxjs/toolkit";
import { basketSlice } from "../../features/basket/basketSlice";
import { catalogSlice } from "../../features/catalog/catalogSlice";

import { accountSlice } from "../../features/account/accountSlice";


export const store=configureStore({
   reducer:{
    basket:basketSlice.reducer,
    //basket:basketSlice,
    catelog:catalogSlice.reducer,
    account:accountSlice.reducer
   }

})


