import { TextField } from "@mui/material"
import {useController}from "react-hook-form"


const AppTextInput = (props) => {
  const {fieldState,field}=useController({...props,defaultValue:''})
  return (
    <TextField 
    {...props}
    {...field}
    fullWidth
    variant="outlined"
    error={!!fieldState.error}
    helperText={fieldState.error?.message}
    />

   
  )
}

export default AppTextInput