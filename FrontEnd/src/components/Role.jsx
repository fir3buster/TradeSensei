import React, { useState, useEffect } from "react";
import styles from "./Chart.module.css";
// import UserContext from "../context/user";

const Role = () => {
  // const [role, setRole] = useState("User");
  // const [context, setContext] = useContext(UserContext);

  // useEffect(() => {

  //   fetchAccountRole()
  //     .then((role) => {

  //       setRole(role || "User");
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching account role:", error);

  //       setRole("User");
  //     });
  // }, []);

  return (
    <>
      <div className={styles.header}>
        {/* Display the account holder's role */}
        {/* <div className={styles.user}>{role}</div> */}
        <div className={styles.user}>Role - Manager</div>
      </div>
    </>
  );
};

export default Role;
