import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../header/api/agent";
import { router } from "../../header/router/Routes";
import { toast } from "react-toastify";
import { setBasket } from "../basket/basketSlice";

const initialState = { user: null };

//createthunk

export const signInUser = createAsyncThunk(
  "account/signInUser",
  async (data, thunkAPI) => {
    try {
      const userDto = await agent.Account.login(data);
      const{basket,...user}=userDto;
      if(basket)thunkAPI.dispatch(setBasket(basket));
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "account/fetchCurrentUser",
  async (_,thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
    
    try {
      const userDto = await agent.Account.currentUser();
      const{basket,...user}=userDto;
      if(basket)thunkAPI.dispatch(setBasket(basket));
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    }
  }
);

//accountSlice
export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      router.navigate("/");
    },
    setUser:(state,action)=>{
       state.user=action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected,(state,action)=>{
          state.user=null;
          localStorage.removeItem("user");
          toast.error("Session may be expired-Please Try again");
          router.navigate("/");

    })
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(signInUser.rejected),
      (state,action) => {
      throw action.payload;
      }
    );
  },
});

export const { signOut,setUser } = accountSlice.actions;
