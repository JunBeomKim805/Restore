import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline, createTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetail";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/Homepage";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import Register from "../../features/account/Register";
import Login from "../../features/account/Login";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import PrivateRoute from "./PrivateRoute";
import Orders from "../../features/orders/Orders";
import CheckoutWrapper from "../checkout/CheckoutWrapper";

function App() {
  // const { setBasket } = useStoreContext();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
    //   const buyerId = getCookie("buyerId");
    //   dispatch(fetchCurrentUser());
    //   if (buyerId) {
    //     agent.Basket.get()
    //       // .then((basket) => setBasket(basket))
    //       .then((basket) => dispatch(setBasket(basket)))
    //       .catch((error) => console.log(error))
    //       .finally(() => {
    //         setLoading(false);
    //       });
    //   } else {
    //     setLoading(false);
    //   }
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

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message="Initializing app..." />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Switch>
          <Route exact path="/catalog" component={Catalog} />
          <Route exact path="/catalog/:id" component={ProductDetails} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/server-error" component={ServerError} />
          <Route exact path="/basket" component={BasketPage} />
          <PrivateRoute path="/checkout" component={CheckoutWrapper} />
          <PrivateRoute path="/orders" component={Orders} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={HomePage} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
