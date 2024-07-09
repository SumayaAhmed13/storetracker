import { Backdrop, CircularProgress, Typography,Box } from "@mui/material";


const Loading = ({message}) => {
  return (
    <Backdrop open={true} invisible={true}>
      <Box display='flex' justifyContent='center'alignItems='center' height='100'>
        <CircularProgress size={100} color="secondary"/>
        <Typography variant="h4" sx={{justifyContent:'center',position:'fixed',top:'60%'}}>
           {message}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default Loading;
