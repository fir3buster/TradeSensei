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

  const [userScoreCtx, setUserScoreCtx] = useState({});
  const [nextPageCtx, setNextPageCtx] = useState({});
  const [prevPageCtx, setPrevPageCtx] = useState({});
  const [applicantIds, setApplicantIds] = useState([]);
  const [page, setPage] = useState(-1);

  const [score, setScore] = useState(0);

  const [resetRateAndCommentContext, setResetRateAndCommentContext] = useState(
    {}
  );
  const [activePageContext, setActivePageContext] = useState({});
  const [activeApplicantId, setActiveApplicantId] = useState("");
  const [activeStaffId, setActiveStaffId] = useState("");

  return (
    <div>
      <UserContext.Provider
        value={{

          nextPage: () => {},
          prevPage: () => {},
          resetRateAndComment: () => {},          

          score, 
          setScore,
          page, 
          setPage,

          accessToken,
          setAccessToken,
          role,
          setRole,
          userCtx,
          showLogin,
          setShowLogin,
          setUserCtx,
          userScoreCtx,
          setUserScoreCtx,
          nextPageCtx,
          setNextPageCtx,
          prevPageCtx,
          setPrevPageCtx,
          resetRateAndCommentContext,
          setResetRateAndCommentContext,
          activeApplicantId,          
          setActiveApplicantId,
          activePageContext,
          setActivePageContext,
          applicantIds, 
          setApplicantIds,     
          
          activeStaffId, 
          setActiveStaffId,
        }}
      >
        {/* <ChartScore></ChartScore> */}
        {accessToken.length > 0 && <ChartScore></ChartScore>}
        {accessToken.length === 0 && showLogin && (
          <Login setShowLogin={setShowLogin}></Login>
        )}
        {accessToken.length === 0 && !showLogin && (
          <Registration setShowLogin={setShowLogin}></Registration>
        )}
      </UserContext.Provider>
    </div>
  );
}

export default App;
