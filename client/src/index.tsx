import React from "react";
import "./app/layout/index.css";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import { Router } from "react-router-dom";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
// import { configureStore } from "./app/store/configureStore";
import { Provider } from "react-redux";
import { store } from "./app/store/configureStore";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// const store = configureStore();

export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      {/* <StoreProvider> */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* </StoreProvider> */}
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
