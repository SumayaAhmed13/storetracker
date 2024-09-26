import {FormControl,FormControlLabel,Radio,RadioGroup} from "@mui/material";

const RadioButtonGroup = ({options,onChange,selectedValue}) => {
  return (
    <FormControl>
    <RadioGroup onChange={onChange} value={selectedValue}>
      {options.map(({ value, label }) => (
        <FormControlLabel
          value={value}
          control={<Radio />}
          label={label}
          key={value}
        />
      ))}
    </RadioGroup>
  </FormControl>
  )
}

export default RadioButtonGroup