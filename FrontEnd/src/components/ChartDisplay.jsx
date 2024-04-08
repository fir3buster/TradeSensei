import React, { useEffect, useRef, useState, useContext } from "react";
import CandleStick2 from "./CandleStick2";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./Chart.module.css";
import Score from "./Score";

const ChartDisplay = () => {
  const userCtx = useContext(UserContext);

  // const [context, setContext] = useContext(UserContext);

  const [tradeData, setTradeData] = useState([]);
  const [page, setPage] = useState(-1);
  // const [scores, setScores] = useState(Array.from({ length: 10 }, () => 0));
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
      console.log("getTradeData data ok");

      console.log(
        `res.data[0]["applicantTrade"]["applicantId"] = ${JSON.stringify(
          res.data[0]["applicantTrade"]["applicantId"]
        )}`
      );

      let temp = []
      for (let index = 0; index < res.data.length; index++) {
        if( temp.includes(res.data[index]["applicantTrade"]["applicantId"])){
          console.log("have already")
        }
        else{
          console.log("hellokitty: " + res.data[index]["applicantTrade"]["applicantId"])
          temp.push(res.data[index]["applicantTrade"]["applicantId"])
        }
        
      }

      console.log("temp array = " + JSON.stringify(temp))
      userCtx.setApplicantIds(temp)

      userCtx.setActiveApplicantId(
        res.data[0]["applicantTrade"]["applicantId"]
      );
      
      console.log("userCtx.activeApplicantId = "+ userCtx.activeApplicantId )
      console.log("res.data" + res.data)
      let activeData=[]
      for ( const datum in res.data){
        if (res.data[0]["applicantTrade"]["applicantId"] === res.data[datum]["applicantTrade"]["applicantId"]){
          console.log("hello dino" + res.data[datum]["applicantTrade"]["applicantId"])
          activeData.push(res.data[datum])
        }
      }
      console.log("activeData" + JSON.stringify(activeData))

      
      setTradeData(activeData);      
      // setTradeData(res.data);
      setPage(0);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const updateScore = (index, score) => {
    userCtx.setScore((prevScores) => {
      const newScores = [...prevScores];
      newScores[index] = score;
      return newScores;
    });
  };

  const nextPage = () => {
    if (page < tradeData.length - 1) {
      setPage(page + 1);
      userCtx.setActivePageContext(page + 1)
      // get function to post api into db (grade & comments )
      // update frunction to post api into db (grade & comments )

    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
      userCtx.setActivePageContext(page - 1)
      // get function to post api into db (grade & comments )
      // update frunction to post api into db (grade & comments )
    }
  };

  useEffect(() => {
    console.log("chartdisplay useeffect");
    getTradeData();
  }, []);

  // useEffect(() => {
  //   console.log("chartdisplay useeffect");
  //   getTradeData();
  // }, userCtx.activeApplicantId);

  return (
    <div className="">
      <div className={styles.chartwrapper}>
        <div className={styles.chart}>
          <CandleStick2
            activePage={page}
            tradeData={tradeData[page]}
            changePage={userCtx.activeApplicantId}
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
        <Score></Score>
        {/* <Score
          score={scores[page]}
          updateScore={(score) => updateScore(page, score)}
        /> */}
      </div>
    </div>
  );
};

export default ChartDisplay;
