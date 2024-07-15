import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import {
  CssBaseline,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { StoreContext } from "../context/StoreContext";
import { getCookie } from "../utility/utils";
import agent from "../api/agent";
import Loading from "./Loading";
function App() {
  const [loading, setLoading] = useState(true);
  const { setbasket } = useContext(StoreContext);
  useEffect(() => {
    const buyerId = getCookie("buyerId");
    console.log(buyerId);
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => setbasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
    else{
      setLoading(false);
    }
  },[setbasket]);
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
  if(loading)return<Loading message='Initializing App'/>
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
