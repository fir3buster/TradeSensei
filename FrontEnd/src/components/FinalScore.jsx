import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./Chart.module.css";

const FinalScore = () => {
  const [finalId, setFinalId] = useState("");
  const [finalScore, setFinalScore] = useState([]);
  const [recommend, setRecommend] = useState(null);
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

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
        for (const data of res.data) {
          if (data.staffId === userCtx.activeStaffId) {
            setFinalScore(data.finalGrade);
            setFinalId(data._id);
          }
        }
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    } catch (error) {
      console.error("error fetching final score:", error);
    }
  };

  const updateFinalRecord = async (recommend) => {
    try {
      const res = await fetchData(
        "/api/managers/" + finalId,
        "PATCH",
        {
          isRecommended: recommend,
        },
        userCtx.accessToken
      );
      if (res.ok) {
        getFinalScore();
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error adding score:", error);
    }
  };

  const handleRecommend = (recommend) => {
    setRecommend(recommend);
    console.log("check recommend:" + recommend);
    updateFinalRecord(recommend);
  };

  useEffect(() => {
    getFinalScore();
  }, []);

  return (
    <div className={styles.finalboard}>
      <div>
        This candidate's final score:
        <div className={styles.finalscore}> {finalScore}/50</div>
      </div>
      {recommend === null ? (
        <div>
          <div>Do you recommend this candidate?</div>
          <button
            className={styles.recobutton}
            onClick={() => handleRecommend(true)}
          >
            Recommend
          </button>

          <button
            className={styles.norecobutton}
            onClick={() => handleRecommend(false)}
          >
            Not recommended
          </button>
        </div>
      ) : recommend === true ? (
        <div className={styles.finalreco}>Recommended!</div>
      ) : (
        <div className={styles.finalnoreco}>Not Recommended!</div>
      )}
    </div>
  );
};

export default FinalScore;
