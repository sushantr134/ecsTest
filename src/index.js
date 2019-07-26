import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { Provider } from "react-redux";

import configureStore from "./redux/store";

if (module.hot) {
  module.hot.accept();
}

const mainStore = configureStore();

ReactDOM.render(
  <Provider store={mainStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
