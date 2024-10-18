import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import StatusCode, { getCookie } from "../../header/utility/utils";
import agent from "../../header/api/agent";

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
    clearBasket:(state)=>{
      state.basket=null;
    }
  },
  extraReducers: (builder) => {
    //add item
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = StatusCode.LOADING + action.meta.arg.productId;
    });
   
    ///remove item
    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      state.status =
        StatusCode.LOADING + action.meta.arg.productId + action.meta.arg.name;
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
      console.log(action.payload);
    });
      //add item
    builder.addMatcher(
      isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled),
      (state, action) => {
        state.basket = action.payload;
        state.status = StatusCode.IDLE;
      }
    );
    builder.addMatcher(
      isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.rejected),
      (state, action) => {
        state.status = StatusCode.ERROR;
        console.log(action.payload);
      }
    );
  },
});
export const { setBasket, removeItem,clearBasket } = basketSlice.actions;
//export default basketSlice.reducer;

export const fetchBasketAsync = createAsyncThunk(
  "basket/fetchBasketAsync",
  async (_, thunkAPI) => {
    try {
      return await agent.Basket.get();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!getCookie("buyerId")) return false;
    },
  }
);

export const addBasketItemAsync = createAsyncThunk(
  "basket/addBasketItemAsync",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      return await agent.Basket.addItem(productId, quantity);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);
export const removeBasketItemAsync = createAsyncThunk(
  "basket/removeBasketItemAsync",
  async ({ productId, quantity}, thunkAPI) => {
    try {
      return await agent.Basket.removeItem(productId, quantity);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);
