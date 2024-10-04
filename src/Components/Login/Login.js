import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { firebasecontext } from "../../Store/Firebasecontext";
import Logo from "../../olx-logo.png";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { firebase } = useContext(firebasecontext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(`Login failed: ${error.message}`);
      });
  };

  return (
    <div>
      <div className="loginParentDiv" >
        <img width="200px" height="200px" src={Logo} style={{alignItems:'center'}}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button style={{ cursor: "pointer" }}>Login</button>
        </form>
        <br></br>
        <button onClick={()=>navigate('/Signup')}>Signup</button>
      </div>
    </div>
  );
}

export default Login;
