import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./Chart.module.css";

const GmScore = () => {
  const [gmId, setGmId] = useState();
  const [allManagerRecords, setAllManagerRecords] = useState([]);
  const [gmRecommend, setGmRecommend] = useState(null);
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  const getAllManagerRecordsByApplicantId = async () => {
    console.log("inside getallmanagerscore");
    console.log(userCtx.activeApplicantId);
    try {
      const res = await fetchData(
        "/api/managers/" + userCtx.activeApplicantId,
        "GET",
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        console.log(res.data);
        setAllManagerRecords(res.data);
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    } catch (error) {
      console.error("error fetching final score:", error);
    }
  };

  const getGeneralManagersRecordsByApplicantId = async () => {
    try {
      const res = await fetchData(
        "/api/generalManagers/" + userCtx.activeApplicantId,
        "GET",
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        console.log(res.data);
        for (const data of res.data) {
          if (data.staffId === userCtx.activeStaffId) {
            setGmId(data._id);
          }
        }
      } else alert(JSON.stringify(res.data));
      console.log(res.data);
    } catch (error) {
      console.error("error fetching final score:", error);
    }
  };

  const UpdateGeneralManagerRecord = async (recommend) => {
    try {
      const res = await fetchData(
        // "/api/generalManagers/" + gmId,
        "/api/generalManagers/" + "66163bc33b9da3bbc75342ce",
        "PATCH",
        {
          isRecommended: recommend,
        },
        userCtx.accessToken
      );
      if (res.ok) {
        getGeneralManagersRecordsByApplicantId();
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error adding score:", error);
    }
  };

  const handleGmRecommend = (recommend) => {
    setGmRecommend(recommend);
    console.log("check recommend:" + recommend);
    UpdateGeneralManagerRecord(recommend);
  };

  useEffect(() => {
    getAllManagerRecordsByApplicantId();
    getGeneralManagersRecordsByApplicantId();
  }, []);

  return (
    <div className={styles.finalboard}>
      <div>
        {allManagerRecords &&
          allManagerRecords.map((record) => {
            const staffId = record.staffId;
            const finalGrade = record.finalGrade;
            const isRecommended = record.isRecommended;

            return (
              <div key={record._id}>
                <div className={styles.gm}>
                  <div className={styles.staff}>Staff ID: {staffId}</div>
                  <div className={styles.staffgrade}>
                    Grade:<b>{finalGrade} </b>
                  </div>
                  <div
                    className={styles.staffreco}
                    style={{ color: isRecommended ? "#01c187" : "#ff5454" }}
                  >
                    Recommended? {isRecommended ? "Yes" : "No"}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <br />
      <br />

      {gmRecommend === null ? (
        <div>
          <div>Recommend this applicant?</div>
          <button
            className={styles.recobutton}
            onClick={() => handleGmRecommend(true)}
          >
            Recommend
          </button>

          <button
            className={styles.norecobutton}
            onClick={() => handleGmRecommend(false)}
          >
            Not recommended
          </button>
        </div>
      ) : gmRecommend === true ? (
        <div className={styles.finalreco}>Recommended!</div>
      ) : (
        <div className={styles.finalnoreco}>Not Recommended!</div>
      )}
    </div>
  );
};

export default GmScore;
