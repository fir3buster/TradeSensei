import React, { useState } from "react";
import Role from "./components/Role";
import Candidate from "./components/Candidate";
import ChartDisplay from "./components/ChartDisplay";
import ChartFunctionsContext from "./context/ChartFunctionsContext";

const ChartScore = () => {
  const [page, setPage] = useState(-1);
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");

  const nextPage = () => {
    if (page === 9) setPage(0);
    else setPage(page + 1);
  };

  const resetRateAndComment = () => {
    setRate(0);
    setComment("");
  };

  return (
    <div>
      <ChartFunctionsContext.Provider value={{ nextPage, resetRateAndComment }}>
        <div className="header">
          <Role /> <Candidate />
        </div>
        <ChartDisplay />
      </ChartFunctionsContext.Provider>
    </div>
  );
};

export default ChartScore;
