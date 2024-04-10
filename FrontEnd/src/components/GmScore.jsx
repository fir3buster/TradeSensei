import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./Chart.module.css";

const GmScore = () => {
  const [finalScore, setFinalScore] = useState([]);
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  useEffect(() => {
    getManagerScore();
  }, []);

  const getManagerScore = async () => {
    try {
      const res = await fetchData(
        "/api/managers/" + userCtx.activeApplicantId,
        "GET",
        null,
        userCtx.accessToken
      );
      if (res.ok) {
        setFinalScore(res.data);
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    } catch (error) {
      console.error("error fetching final score:", error);
    }
  };

  const addChoice = async () => {
    try {
      const res = await fetchData(
        "/api/managers/" + id,
        "PATCH",
        {
          // applicantId: userCtx.activeApplicantId,
          staffId: "M30000",
          grade: rate,
          comment: comment,
        },
        userCtx.accessToken
      );
      if (res.ok) {
        getScore();
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error adding score:", error);
    }
  };

  return (
    <div className={styles.score}>
      <div>{JSON.stringify(finalScore)}</div>
      <div>
        <button className={styles.recobutton}>Recommend</button>
        <button className={styles.norecobutton}>Not recommended</button>
      </div>
    </div>
  );
};

export default GmScore;
