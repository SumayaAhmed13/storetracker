import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import agent from "../../header/api/agent";
const AboutPage = () => {
  return (
    <Container>
      <Typography gutterBottom variant="h2">
        Error For Testing Purpose
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get400Error().catch((error) => console.log(error))
          }>
          Error 400(Bad Request)
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get401Error().catch((error) => console.log(error))
          }>
          UnAuthorised
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get403Error().catch((error) => console.log(error))
          }>
          ValidationError
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get404Error().catch((error) => console.log(error))
          }>
          Error 404(Not Found)
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get500Error().catch((error) => console.log(error))
          }>
          Error 500(Server Error)
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default AboutPage;
