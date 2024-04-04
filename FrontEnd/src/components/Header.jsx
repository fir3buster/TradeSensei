import React from "react";
import styles from "./Chart.module.css";

const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>TradeSensei - manager</div>
        {/* <div className={styles.user}>Manager</div> */}
      </div>
    </>
  );
};

export default Header;
