import React, { useState, createContext, useContext } from "react";
import ChartScore from "./ChartScore";
import UserContext from "./context/user";
import Login from "./components/Login";
import Registration from "./components/Registration";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [userCtx, setUserCtx] = useState({});

  return (
    <div>
      <UserContext.Provider value={[userCtx, setUserCtx]}>
        <ChartScore></ChartScore>
      </UserContext.Provider>
      {/* <UserContext.Provider
        value={{ accessToken, setAccessToken, role, setRole }}
      >
        {accessToken.length > 0 && <ChartScore></ChartScore>}
        {accessToken.length === 0 && showLogin && (
          <Login setShowLogin={setShowLogin}></Login>
        )}
        {accessToken.length === 0 && !showLogin && (
          <Registration setShowLogin={setShowLogin}></Registration>
        )}
      </UserContext.Provider> */}
      {/* </> */}
    </div>
  );
}

export default App;
