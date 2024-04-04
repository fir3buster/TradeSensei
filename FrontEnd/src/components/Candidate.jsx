import React, { useState, useEffect } from "react";
import styles from "./Score.module.css";

const Candidate = () => {
  // const [candidateIDs, setCandidateIDs] = useState([]);

  // const [selectedID, setSelectedID] = useState("");

  // useEffect(() => {

  //   fetchCandidateIDs()
  //     .then((ids) => setCandidateIDs(ids))
  //     .catch((error) => console.error("Error fetching candidate IDs:", error));
  // }, []);

  // const handleSelectChange = (event) => {
  //   setSelectedID(event.target.value);
  // };

  return (
    <div>
      <div className={styles.candidate}>
        {/* Render dropdown */}
        {/* <select value={selectedID} onChange={handleSelectChange}> */}
        <select>
          <option value="">Select Candidate ID</option>
          {/* Map over candidateIDs to render options */}
          {/* {candidateIDs.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))} */}
        </select>
        <hr />
      </div>
    </div>
  );
};

export default Candidate;
