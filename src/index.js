//index.js is the parent JS file of your react application, and is not commonly
//worked in. You will, however, bring in HashRouter(for routing) and Provider(redux)
//when your project calls for it. These should be imported and then wrapped around
//the App component. Provider is passed your store file as a prop.
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
