import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";
import { Authcontext, firebasecontext } from "./Store/Firebasecontext";
import Post from "./Store/Postcontext";

/**
 * ?  =====Import Components=====
 */
import Home from "./Pages/Home";

function App() {
  const { user, setUser } = useContext(Authcontext);
  const { firebase } = useContext(firebasecontext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <div>
      <Post>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view" element={<View />} />
          </Routes>
        </BrowserRouter>
      </Post>
    </div>
  );
}

export default App;
