import React from "react";
import styles from "./Score.module.css";

const CommentBox = () => {
  return (
    <>
      <div className={styles.commentbox}>
        <div className={styles.comment}>Your comment - optional:</div>
        <input className={styles.box} />
      </div>
    </>
  );
};

export default CommentBox;
