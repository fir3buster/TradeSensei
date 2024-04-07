import React, { useState, useEffect, useContext } from "react";
import styles from "./Chart.module.css";
import UserContext from "../context/user";
const Candidate = () => {
  const [context, setContext] = useContext(UserContext);

  return (
    <div>
      <div className={styles.candidate}>
        <div>Select the Applicant's ID:</div>
        <select className={styles.candidatebox}>
          <option value={context}>{context}</option>
        </select>
        <hr />
      </div>
    </div>
  );
};

export default Candidate;
