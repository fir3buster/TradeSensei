import React, { useState, useContext } from "react";
// import useFetch from "./hooks/useFetch";
// import UserContext from "../context/user";
// import { jwtDecode } from "jwt-decode";

const Login = () => {
  // const fetchData = useFetch();

  // const userCtx = useContext(UserContext);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleLogin = async () => {
  //     const res = await fetchData("/auth/login", "POST", { email, password });

  //     if (res.ok) {
  //         // set access token
  //         userCtx.setAccessToken(res.data.access);
  //         // decode the claims from backend
  //         const decoded = jwtDecode(res.data.access);
  //         // get the role from the decoded claims
  //         userCtx.setRole(decoded.role);
  //     } else {
  //         alert(JSON.stringify(res.data));
  //     }
  // };

  return (
    <>
      <br />
      <div className="row">
        <div className="col-md-4"></div>
        <input
          type="text"
          className="col-md-4"
          placeholder="email"
          //   value={email}
          //   onChange={(e) => setEmail(e.target.value)}
        />
        <div className="col-md-4"></div>
      </div>
      <div className="row">
        <div className="col-md-4"></div>
        <input
          type="password"
          className="col-md-4"
          placeholder="password"
          //   value={password}
          //   onChange={(e) => setPassword(e.target.value)}
        />
        <div className="col-md-4"></div>
      </div>
      <div className="row">
        <div className="col-md-4"></div>
        <button className="col-md-4" type="submit">
          login
        </button>
        <div className="col-md-4"></div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-4"></div>
        <button className="col-md-4" type="submit">
          go to registration screen
        </button>
        <div className="col-md-4"></div>
      </div>
    </>
  );
};

export default Login;
