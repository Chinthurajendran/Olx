import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { Authcontext, firebasecontext } from "../../Store/Firebasecontext";
function Header() {
  const { user } = useContext(Authcontext);
  const { firebase } = useContext(firebasecontext);

  const navigate = useNavigate();

  const logout = () => [firebase.auth().signOut(), navigate("/login")];

  const sellerButton = () => {
    if (user === null) {
      alert('Please log in.');
    }
    else{
      navigate('/create')
    }
  };
  
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
        <OlxLogo onClick={() => navigate('/')} />
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span style={{ cursor: "pointer" }} onClick={()=>navigate('/login')}>
            {user ? user.displayName : "Login"}
          </span>
          <hr />
        </div>
        {user && (
          <span onClick={logout} style={{ cursor: "pointer" }}>
            Logout
          </span>
        )}
        <div className="sellMenu" onClick={sellerButton}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
