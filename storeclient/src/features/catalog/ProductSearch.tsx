import { debounce, TextField } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { setProductParams } from "./catalogSlice";
import { useState } from "react";


const ProductSearch = () => {
    const { productParams}=useSelector(state=>state.catelog);
    const [searchTerm,setSearchTerm]=useState(productParams.searchTerm);
    const dispatch=useDispatch();

    const debouncedSearch=debounce((event)=>{
        dispatch(setProductParams({ searchTerm: event.target.value }))
    },1000)
 
  return (
    <TextField label="Search Products" variant="outlined" fullWidth
    value={searchTerm || ''}
    onChange={(event)=>{
        setSearchTerm(event.target.value);
        debouncedSearch(event);
    }}/>
  )
}

export default ProductSearch