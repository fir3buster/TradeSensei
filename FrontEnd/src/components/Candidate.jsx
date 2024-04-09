import React, { useState, useEffect, useContext } from "react";
import styles from "./Chart.module.css";
import UserContext from "../context/user";
const Candidate = () => {
  const userCtx = useContext(UserContext);
  // const [context, setContext] = useContext(UserContext);
  const handleOnChange = (event) => {
    // console.log("selected option="+ props.reference)
    console.log("event.target.value=" + event.target.value)
    userCtx.setActiveApplicantId(event.target.value)
  }

  return (
    <div>
      <div className={styles.candidate}>
        <div>Select the Applicant's ID:</div>
        {/* {JSON.stringify(userCtx.applicantIds)} */}
        <select onChange={handleOnChange}  className={styles.candidatebox}>
        
        {userCtx.applicantIds && 
          userCtx.applicantIds.map((applicantId, idx)=>(
            <option key={idx} value={applicantId}>{applicantId}</option>
        ))}
          
            
          
        </select>
        <hr />
      </div>
    </div>
  );
};

export default Candidate;
