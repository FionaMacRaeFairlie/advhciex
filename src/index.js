import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./components/App/App";
import { store } from "./reduxStore/store/store";
import { Provider } from "react-redux";

const getContext = () => {
  fetch("/hostels")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

ReactDOM.render(
  <Provider store={store}>
    {/* <hostelsContext.Provider value={getContext()}> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </hostelsContext.Provider> */}
  </Provider>,
  document.getElementById("root")
);
