import { FormControlLabel,Checkbox } from "@mui/material";
import { useController } from "react-hook-form";

const AppCheckbox = (props) => {
  const { field } = useController({...props,defaultValue:false});

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...field}
          checked={field.value}
          color="success"
          disabled={props.disabled}
        />
      }
      label={props.label}
    />
  );
};

export default AppCheckbox;
