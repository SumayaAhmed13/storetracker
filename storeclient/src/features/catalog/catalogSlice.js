import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../header/api/agent";
import StatusCode from "../../header/utility/utils";

const productAdapter = createEntityAdapter();

export const fetchProductsAsync = createAsyncThunk(
  "catelog/fetchProductsAsync",
  async () => {
    try{
        return await agent.Catalog.list()
    }
    catch(error){
      console.log(error);
    }
  }
);
export const fetchProductAsync = createAsyncThunk(
    "catelog/fetchProductAsync",
    async (productId) => {
      try{
          return await agent.Catalog.details(productId)
      }
      catch(error){
        console.log(error);
      }
    }
  );

export const catalogSlice=createSlice({
    name:"catelog",
    initialState:productAdapter.getInitialState({
        productLoaded:false,
        status:StatusCode.IDLE
    }),
    reducers:{

    },
    extraReducers:(builder)=>{
        //All Product Get
        builder.addCase(fetchProductsAsync.pending,(state)=>{
            state.status=StatusCode.LOADING;
        });
        builder.addCase(fetchProductsAsync.fulfilled,(state,action)=>{
            productAdapter.setAll(state,action.payload)
            state.status=StatusCode.IDLE;
            state.productLoaded=true;
        });
        builder.addCase(fetchProductsAsync.rejected,(state)=>{
            state.status=StatusCode.IDLE;
        });
        //Single Product Details Get By Id
        builder.addCase(fetchProductAsync.pending,(state)=>{
            state.status=StatusCode.LOADING;
        });
        builder.addCase(fetchProductAsync.fulfilled,(state,action)=>{
            productAdapter.upsertOne(state,action.payload)
            state.status=StatusCode.IDLE;
          
        });
        builder.addCase(fetchProductAsync.rejected,(state)=>{
            state.status=StatusCode.IDLE;
        });
    }
})
export const productSelectors=productAdapter.getSelectors(state=>state.catelog)