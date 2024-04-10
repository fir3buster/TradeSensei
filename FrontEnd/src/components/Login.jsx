import React, { useState, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";
import logo from "../ts_logo.png";

const Login = (props) => {
  const fetchData = useFetch();

  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetchData(
      "/auth/login",
      "POST",
      { email, password },
      undefined
    );

    if (res.ok) {
      // set access token
      userCtx.setAccessToken(res.data.access);
      // decode the claims from backend
      const decoded = jwtDecode(res.data.access);
      // get the role from the decoded claims
      userCtx.setRole(decoded.role);
      // get staffId from decoded claims
      userCtx.setActiveStaffId(decoded.staffId);
      // console.log(decoded.staffId)
      // save refresh token into local storage
      localStorage.setItem(decoded.staffId, res.data.refresh);
      // // // quick check on localstorage key
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  return (
    <>
      <br />
      <div className="login">
        <img src={logo} className="logo"></img>
        <div className="">
          <div className=""></div>
          <input
            type="text"
            className="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className=""></div>
        </div>
        <div className="">
          <div className=""></div>
          <input
            type="password"
            className="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className=""></div>
        </div>
        <div className="">
          <div className=""></div>
          <button className="loginButton" onClick={handleLogin} type="submit">
            login
          </button>
          <div className=""></div>
        </div>
        <br />
        <div className="">
          <div className=""></div>
          <button
            className="goToRegisterButton"
            type="submit"
            onClick={() => props.setShowLogin(false)}
          >
            go to registration screen
          </button>
          <div className=""></div>
        </div>
      </div>
    </>
  );
};

export default Login;
