import React from "react";
import Chartsection from "./Chartsection";
import Scoresection from "./Scoresection";
// import Login from "./components/Login";
// import Registration from "./components/Registration";

function App() {
  // const [accessToken, setAccessToken] = useState("");
  // const [role, setRole] = useState("");
  // const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      {/* <h2>TradeSensei</h2> */}
      <Chartsection></Chartsection>
      <Scoresection></Scoresection>
      {/* <Login></Login>
      <Registration></Registration> */}
    </div>
  );
}

export default App;
