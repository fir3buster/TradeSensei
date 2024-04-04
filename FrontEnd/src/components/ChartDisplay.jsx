import React, { useEffect, useRef, useState, useContext } from "react";
import CandleStick2 from "./CandleStick2";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const ChartDisplay = () => {
  const userCtx = useContext(UserContext);
  const [tradeData, setTradeData] = useState([]);
  const [activeTradeData, setActiveTradeData] = useState([]);
  const [page, setPage] = useState(-1);
  const fetchData = useFetch();

  const getTradeData = async () => {
    const res = await fetchData(
      "/api/tradeData",
      undefined,
      undefined,
      undefined /*userCtx.accessToken*/
    );

    if (res.ok) {
      console.log("getTradeData data ok");
      // console.log(JSON.stringify(res.data))
      setTradeData(res.data);
      setPage(0);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const nextPage = async () => {
    if (page === 9) setPage(0);
    else setPage(page + 1);
  };

  const prevPage = async () => {
    if (page != 0) setPage(page - 1);
    else setPage(9);
  };

  useEffect(() => {
    console.log("chartdisplay useeffect");
    getTradeData();
  }, []);

  return (
    <div className="">
      <div className="">
        <CandleStick2
          activePage={page}
          tradeData={tradeData[page]}
        ></CandleStick2>
        <div className="">
          <button onClick={prevPage}>Turn Left</button>
          <label className="">Page {page + 1}</label>
          <button onClick={nextPage}>Turn Right</button>
        </div>
      </div>
    </div>
  );
};

export default ChartDisplay;
