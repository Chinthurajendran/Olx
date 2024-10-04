import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { firebasecontext } from "./Store/Firebasecontext";
import firebase from "./firebase/Config";
import Context from "./Store/Firebasecontext";

ReactDOM.render(
  <firebasecontext.Provider value={{ firebase }}>
    <Context>
      <App />
    </Context>
  </firebasecontext.Provider>,
  document.getElementById("root")
);
