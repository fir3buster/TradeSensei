import React, { useContext } from "react";
import styles from "./Chart.module.css";
import UserContext from "../context/user";

const Candidate = () => {
  const userCtx = useContext(UserContext);

  const handleOnChange = (event) => {
    userCtx.setActiveApplicantId(event.target.value);
  };

  return (
    <div>
      <div className={styles.candidate}>
        <div>Select the Applicant's ID:</div>

        <select onChange={handleOnChange} className={styles.candidatebox}>
          {userCtx.applicantIds &&
            userCtx.applicantIds.map((applicantId, idx) => (
              <option
                key={idx}
                value={applicantId}
                className={styles.candidatedropdown}
              >
                {applicantId}
              </option>
            ))}
        </select>
        <hr />
      </div>
    </div>
  );
};

export default Candidate;
