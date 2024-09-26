import {Checkbox,FormControlLabel,FormGroup} from "@mui/material";
import { useState } from "react";

const CheckboxButtons = ({items,checked,onChange}) => {
    const [checkedItems,setCheckedItems]=useState(checked||[]);

    const handleChecked=(value)=>{
        const currentIndex=checkedItems.findIndex(item=>item === value);
        let checkItem =[];
        if(currentIndex===-1) checkItem=[...checkedItems,value];
        else checkItem=checkedItems.filter(item=>item !==value);
       
        setCheckedItems(checkItem);
        onChange(checkItem);
    }
  return (
    <FormGroup>
    {items.map((item) => (
      <FormControlLabel
        control={<Checkbox
            checked={checkedItems.indexOf(item)!==-1}/>}
            onClick={()=>handleChecked(item)}
        label={item}
        key={item}
      />
    ))}
  </FormGroup>
  )
}

export default CheckboxButtons