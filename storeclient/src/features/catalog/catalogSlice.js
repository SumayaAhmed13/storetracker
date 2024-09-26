import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../../header/api/agent";
import StatusCode from "../../header/utility/utils";

const productAdapter = createEntityAdapter();
//For Query Parameter
function getAxiosParams(productParams) {
  const params = new URLSearchParams();
  params.append('pageNumber', productParams.pageNumber.toString());
  params.append('pageSize', productParams.pageSize.toString());
  params.append('orderBy', productParams.orderBy);
  if (productParams.searchTerm) params.append('searchTerm', productParams.searchTerm);
  if (productParams.types.length > 0) params.append('types', productParams.types.toString());
  if (productParams.brands.length > 0) params.append('brands', productParams.brands.toString());
  return params;
}

//Get All Products
export const fetchProductsAsync = createAsyncThunk(
  "catelog/fetchProductsAsync",
  async (_, thunkAPI) => {
    const params=getAxiosParams(thunkAPI.getState().catelog.productParams);
    try {

      const response= await agent.Catalog.list(params);
      thunkAPI.dispatch(setMetaData(response.metaData));
      return response.items;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

//Get  Product by Id
export const fetchProductAsync = createAsyncThunk(
  "catelog/fetchProductAsync",
  async (productId, thunkAPI) => {
    try {
      return await agent.Catalog.details(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchFiltersAsync = createAsyncThunk(
  "catalog/fetchFilters",
  async (_, thunkAPI) => {
    try {
      return await agent.Catalog.fetchFilters();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

function initParams() {
  return {
      pageNumber: 1,
      pageSize: 6,
      orderBy: 'name',
      brands: [],
      types: [],
      
  }
}

export const catalogSlice = createSlice({
  name: "catelog",
  initialState: productAdapter.getInitialState({
    productLoaded: false,
    status: StatusCode.IDLE,
    filtersLoaded: false,
    brands: [],
    types: [],
    productParams:initParams(),
    metaData:null
  }),
  reducers: {
    setProductParams:(state,action)=>{
      state.productLoaded=false;
      //state.productParams={...state.productParams,...action.payload};
      state.productParams = {...state.productParams, ...action.payload, pageNumber: 1}
    },
    setPageNumber:(state,action)=>{
      state.productLoaded=false;
      state.productParams = {...state.productParams, ...action.payload}
    },
    setMetaData:(state,action)=>{
      state.metaData=action.payload;
    },
    resetProductParams:(state)=>{
      state.productParams=initParams();
    }
   
  },
  extraReducers: (builder) => {
    //All Product Get
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = StatusCode.LOADING;
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productAdapter.setAll(state, action.payload);
      state.status = StatusCode.IDLE;
      state.productLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = StatusCode.IDLE;
    });
    //Single Product Details Get By Id
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = StatusCode.LOADING;
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productAdapter.upsertOne(state, action.payload);
      state.status = StatusCode.IDLE;
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      console.log(action);
      state.status = StatusCode.IDLE;
    });
    //Filter Product By Brands and Types
    builder.addCase(fetchFiltersAsync.pending, (state) => {
      state.status = StatusCode.LOADING;
    });
    builder.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
      state.brands = action.payload.brands;
      state.types = action.payload.types;
      state.filtersLoaded = true;
      state.status = StatusCode.IDLE;
    });
    builder.addCase(fetchFiltersAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = StatusCode.IDLE;
    });
  },
});

export const { setProductParams, resetProductParams,setMetaData,setPageNumber } = catalogSlice.actions;
export const productSelectors = productAdapter.getSelectors(
  (state) => state.catelog
);
