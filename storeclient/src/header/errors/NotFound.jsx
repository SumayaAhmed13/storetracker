import { Button, Container, Divider, Typography,Paper} from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container component={Paper} sx={{ height:200}}>
      <Typography variant="h3" gutterBottom>
        Oops -we could not find what you are looking for
      </Typography>
      <Divider/>
      <Button fullWidth component={Link} to='/catalog'>Go Back to Shop</Button>
    </Container>
  );
};

export default NotFound;
