import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import {
  CssBaseline,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

import Loading from "./Loading";
import { useDispatch } from "react-redux";
import { fetchBasketAsync} from "../../features/basket/basketSlice";
import { fetchCurrentUser } from "../../features/account/accountSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const initApp =useCallback(
    async () => {
      try {
        await dispatch(fetchCurrentUser());
        await dispatch(fetchBasketAsync());
      } catch (error) {
        console.log(error);
      }
    },[dispatch])
  useEffect(() => {
    initApp().then(() => {
      setLoading(false);
    });
  }, [initApp]);
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });
  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };
  if (loading) return <Loading message="Initializing App" />;
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Navbar darkMode={darkMode} themeChange={handleThemeChange} />
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
