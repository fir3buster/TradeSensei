import React, { useContext, useState, useEffect } from "react";
import styles from "./Chart.module.css";
import UserContext from "../context/user";

const Role = (props) => {
  const userCtx = useContext(UserContext);
  const [isUserDropDown, setIsUserDropDown] = useState(false);

  const toggleUserDropDown = () => {
    setIsUserDropDown(!isUserDropDown);
  };

  const signOut = () => {
    console.log("USER SIGN OUT!");
    userCtx.setAccessToken("");
    // logic to reset any states to default if necessary
    window.location.reload();
  };

  return (
    <>
      <div className={styles.header}>
        {/* Display the account holder's role */}
        {/* <div className={styles.user}>{role}</div> */}
        <div className={styles.userRole}>
          <button
            onClick={toggleUserDropDown}
            className={`${styles.role} ${isUserDropDown ? styles.active : ""}`}
          >
            {userCtx.activeStaffId}
          </button>
        </div>

        {isUserDropDown && (
          <div className={styles.dropdownContent}>
            <button onClick={signOut} className={styles.dropdownItem}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Role;
