import React from "react";
import styles from "./Chart.module.css";

const ChartSkeleton = () => {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeleton}>Chart Loading...</div>
    </div>
  );
};

export default ChartSkeleton;
