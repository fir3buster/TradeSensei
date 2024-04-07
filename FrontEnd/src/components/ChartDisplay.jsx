import React, { useEffect, useRef, useState, useContext } from "react";
import CandleStick2 from "./CandleStick2";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import Score from "./Score";
import styles from "./Chart.module.css";

const ChartDisplay = () => {
  // const userCtx = useContext(UserContext);

  const [context, setContext] = useContext(UserContext);

  const [tradeData, setTradeData] = useState([]);
  const [page, setPage] = useState(-1);
  const [scores, setScores] = useState(Array.from({ length: 10 }, () => 0));
  const fetchData = useFetch();

  const getTradeData = async () => {
    const res = await fetchData(
      "/api/chart/tradeData",
      undefined,
      undefined,
      undefined /*userCtx.accessToken*/
    );

    if (res.ok) {
      console.log("getTradeData data ok");

      console.log(
        `res.data[0]["applicantTrade"]["applicantId"] = ${JSON.stringify(
          res.data[0]["applicantTrade"]["applicantId"]
        )}`
      );
      setContext(res.data[0]["applicantTrade"]["applicantId"]);

      setTradeData(res.data);
      setPage(0);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const updateScore = (index, score) => {
    setScores((prevScores) => {
      const newScores = [...prevScores];
      newScores[index] = score;
      return newScores;
    });
  };

  const nextPage = () => {
    if (page < tradeData.length - 1) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    console.log("chartdisplay useeffect");
    getTradeData();
  }, []);

  return (
    <div className="">
      <div className={styles.chartwrapper}>
        <div className={styles.chart}>
          <CandleStick2
            activePage={page}
            tradeData={tradeData[page]}
          ></CandleStick2>
        </div>
        <div className={styles.chartbuttons}>
          <button
            className={styles.buttonchart}
            onClick={prevPage}
            disabled={page === 0}
          >
            Prev Chart
          </button>
          <label>Page {page + 1}</label>
          <button
            className={styles.buttonchart}
            onClick={nextPage}
            disabled={page === tradeData.length - 1}
          >
            Next Chart
          </button>
        </div>
      </div>

      <div>
        <Score
          score={scores[page]}
          updateScore={(score) => updateScore(page, score)}
        />
      </div>
    </div>
  );
};

export default ChartDisplay;
