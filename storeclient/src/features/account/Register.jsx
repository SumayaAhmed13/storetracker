import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import agent from "../../header/api/agent";
import { useForm } from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import { toast } from "react-toastify";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const Container = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "all",
  });

  const handleApiError = (errors) => {
    if (errors) {
      errors.forEach((error) => {
        if (error.includes('Password')) {
            setError('password', { message: error })
        } else if (error.includes('Email')) {
            setError('email', { message: error })
        } else if (error.includes('Username')) {
            setError('username', { message: error })
        }
    });
    }
  };
  return (
    <Container direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "bold", textAlign: "center" }}>
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit((data) =>
            agent.Account.register(data)
            .then(() => {
             toast.success('Registration successful - you can now login');
              navigate('/login');
           })
            .catch((error) => handleApiError(error))
          )}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}>
          <FormControl>
            <FormLabel htmlFor="username">User Name</FormLabel>
            <TextField
              type="username"
              placeholder="User Name"
              autoFocus
              required
              fullWidth
              variant="outlined"
              sx={{ ariaLabel: "username" }}
              {...register("username", { required: "User Name is Required" })}
              error={!!errors.username}
              helperText={errors?.username?.message}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              placeholder="email"
              type="email"
              fullWidth
              variant="outlined"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                    value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                    message: 'Not a valid email address'
                }
            })}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              placeholder="••••••"
              type="password"
              fullWidth
              variant="outlined"
              {...register('password', { 
                required: 'password is required',
                pattern: {
                    value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                    message: 'Password does not meet complexity requirements'
                } 
            })}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
          </FormControl>

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={isSubmitting}
            disabled={!isValid}>
            Register
          </LoadingButton>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <span>
              <Link to="/login" variant="body2" sx={{ alignSelf: "center" }}>
                Sign in
              </Link>
            </span>
          </Typography>
        </Box>
        <Divider></Divider>
      </Card>
    </Container>
  );
}
