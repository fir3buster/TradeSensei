import React, {useState, createContext, useContext} from "react";
import Chartsection from "./Chartsection";
import Scoresection from "./Scoresection";
import UserContext from "./context/user";
// import Login from "./components/Login";
// import Registration from "./components/Registration";

function App() {
  // const [accessToken, setAccessToken] = useState("");
  // const [role, setRole] = useState("");
  // const [showLogin, setShowLogin] = useState(true);
  const [userCtx, setUserCtx] = useState("");

  return (
    <div>
      {/* <h2>TradeSensei</h2> */}
      <UserContext.Provider value={[userCtx, setUserCtx]}>
        <Chartsection></Chartsection>
        <Scoresection></Scoresection>
      </UserContext.Provider>
      {/* <Login></Login>
      <Registration></Registration> */}
    </div>
  );
}

export default App;
