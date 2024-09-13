import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StatusCode from "../../header/utility/utils";
import agent from "./../../header/api/agent";

const initialState = {
  basket: null,
  status: StatusCode.IDLE,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    removeItem: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.basket?.items.findIndex(
        (i) => i.productId === productId
      );
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.basket.items[itemIndex].quantity -= quantity;
      if (state.basket.items[itemIndex].quantity === 0)
        state.basket.items.splice(itemIndex, 1);
    },

  },
  extraReducers:(builder)=>{
   //add item
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = StatusCode.LOADING + action.meta.arg.productId;
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.status = StatusCode.IDLE;
    });
    builder.addCase(addBasketItemAsync.rejected, (state, action) => {
      state.status = StatusCode.ERROR;
    });
    ///remove item
    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      state.status = StatusCode.LOADING + action.meta.arg.productId +action.meta.arg.name;
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      const itemIndex = state.basket?.items.findIndex(
        (i) => i.productId === productId
      );
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.basket.items[itemIndex].quantity -= quantity;
      if (state.basket.items[itemIndex].quantity === 0)
        state.basket.items.splice(itemIndex, 1);

      state.status = StatusCode.IDLE;
    });
    builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
      state.status = StatusCode.ERROR;
    });
  }
});
export const { setBasket, removeItem } = basketSlice.actions;

export const addBasketItemAsync = createAsyncThunk(
  "basket/addBasketItemAsync",
  async ({productId, quantity}) => {
    try {
      return await agent.Basket.addItem(productId, quantity);
    } catch (error) {
      console.log(error);
    }
  }
);
export const removeBasketItemAsync = createAsyncThunk(
  "basket/removeBasketItemAsync",
  async ({productId, quantity=1}) => {
    try {
      return await agent.Basket.removeItem(productId, quantity);
    } catch (error) {
      console.log(error);
    }
  }
);


