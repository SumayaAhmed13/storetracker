import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import {
  CssBaseline,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import {useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { getCookie } from "../utility/utils";
import agent from "../api/agent";
import Loading from "./Loading";
import { useDispatch } from "react-redux";
import { setBasket } from "../../features/basket/basketSlice";

function App() {
  const [loading, setLoading] = useState(true);
  //const { setbasket } = useContext(StoreContext);
  const dispatch=useDispatch();
  useEffect(() => {
    const buyerId = getCookie("buyerId");
    console.log(buyerId);
    if (buyerId) {
      agent.Basket.get()
        .then((basket) =>dispatch(setBasket(basket))) 
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
    else{
      setLoading(false);
    }
  },[dispatch]);
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
