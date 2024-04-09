import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./Chart.module.css";

const FinalScore = () => {
  const [finalScore, setFinalScore] = useState([]);
  const [recommend, setRecommend] = useState(null);
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  // const createManager = async () => {
  //   try {
  //     const res = await fetchData(
  //       "/api/managers/",
  //       "POST",
  //       {
  //         staffId: userCtx.activeStaffId,
  //         applicantId: userCtx.activeApplicantId,
  //       },
  //       userCtx.accessToken
  //     );
  //   } catch (error) {
  //     console.error("Error adding score:", error);
  //   }
  // };

  const getFinalScore = async () => {
    try {
      const res = await fetchData(
        "/api/managers/" + userCtx.activeApplicantId,
        "GET",
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        console.log(JSON.stringify(res.data));
        // setFinalScore(res.data);
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    } catch (error) {
      console.error("error fetching final score:", error);
    }
  };

  const addFinalScore = async () => {
    try {
      const res = await fetchData(
        "/api/managers/" + _id,
        "PATCH",
        {
          staffId: userCtx.activeStaffId,
          isRecommend: recommend ? 1 : 0,
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

  useEffect(() => {
    getFinalScore();
  }, []);

  return (
    <div className={styles.score}>
      <div>This candidate's final score:{finalScore}</div>
      <div>
        <button
          className={styles.nextbutton}
          onClick={() => {
            setRecommend(true);
            addFinalScore(true);
          }}
        >
          Recommend
        </button>

        <button
          className={styles.nextbutton}
          onClick={() => {
            setRecommend(false);
            addFinalScore(false);
          }}
        >
          Not recommended
        </button>
      </div>
    </div>
  );
};

export default FinalScore;
