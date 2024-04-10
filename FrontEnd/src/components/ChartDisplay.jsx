import React, { useEffect, useRef, useState, useContext } from "react";
import CandleStick2 from "./CandleStick2";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./Chart.module.css";
import Score from "./Score";
import FinalScore from "./FinalScore";
import ChartSkeleton from "./ChartSkeleton";

const ChartDisplay = () => {
  const userCtx = useContext(UserContext);

  const [tradeData, setTradeData] = useState([]);
  const [page, setPage] = useState(-1);
  const [finalScoreSubmitted, setFinalScoreSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useFetch();

  const getTradeData = async () => {
    const res = await fetchData(
      "/api/chart/tradeData",
      undefined,
      undefined,
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setIsLoading(false);

      let temp = [];
      for (let index = 0; index < res.data.length; index++) {
        if (temp.includes(res.data[index]["applicantTrade"]["applicantId"])) {
          // console.log("have already");
        } else {
          temp.push(res.data[index]["applicantTrade"]["applicantId"]);
        }
      }

      userCtx.setApplicantIds(temp);

      userCtx.setActiveApplicantId(
        res.data[0]["applicantTrade"]["applicantId"]
      );

      let activeData = [];
      for (const datum in res.data) {
        if (
          res.data[0]["applicantTrade"]["applicantId"] ===
          res.data[datum]["applicantTrade"]["applicantId"]
        ) {
          activeData.push(res.data[datum]);
        }
      }

      setTradeData(activeData);
      setPage(1);
      userCtx.setActivePageContext(1); // real world number
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const nextPage = () => {
    if (page < tradeData.length) {
      setPage(page + 1);
      userCtx.setActivePageContext(page + 1);
      // get function to post api into db (grade & comments )
      // update frunction to post api into db (grade & comments )      
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
      userCtx.setActivePageContext(page - 1);
      // get function to post api into db (grade & comments )
      // update frunction to post api into db (grade & comments )
    }
  };

  useEffect(() => {
    console.log("chartdisplay useeffect");
    getTradeData();
  }, []);

  return (
    <div className="">
      {isLoading ? (
        <ChartSkeleton /> // Display the placeholder while loading
      ) : (
        <div className={styles.chartwrapper}>
          <div className={styles.chart}>
            <CandleStick2
              activePage={page}
              tradeData={tradeData[page-1]}
              changePage={userCtx.activeApplicantId}
            ></CandleStick2>
          </div>
          <div className={styles.chartbuttons}>
            <button
              className={styles.buttonchart}
              onClick={prevPage}
              disabled={page === 1}
            >
              Prev Chart
            </button>
            <label>Page {page}</label>
            <button
              className={styles.buttonchart}
              onClick={nextPage}
              disabled={page === 10}
            >
              Next Chart
            </button>
          </div>
        </div>
      )}
      <div>
        <Score totalPages={tradeData.length}></Score>
        {/* {finalScoreSubmitted && <FinalScore />} */}
        {/* <FinalScore></FinalScore> */}
      </div>
    </div>
  );
};

export default ChartDisplay;
