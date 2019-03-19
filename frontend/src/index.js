import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { router } from "./router.js";
var url = 'http://127.0.0.1:5000/';
var imageurl = 'http://127.0.0.1:5000/uploads/'
export { url, imageurl }

// render the main component
ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
