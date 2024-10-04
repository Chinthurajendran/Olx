import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { firebasecontext } from "../../Store/Firebasecontext";

export default function Signup() {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { firebase } = useContext(firebasecontext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({ displayName: userName }).then(() => {
          firebase
            .firestore()
            .collection("users")
            .add({
              id: result.user.uid,
              name: userName,
              phone: phone,
            })
            .then(() => {
              navigate("/login");
            });
        });
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            onChange={(e) => setUsername(e.target.value)}
            value={userName}
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            type="tel"
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Sign up</button>
        </form>
        <br/>
        <button onClick={()=>navigate('/login')} >Login</button>
      </div>
    </div>
  );
}
