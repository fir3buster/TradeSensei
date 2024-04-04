import React from "react";
import Candidate from "./components/Candidate";
import Score from "./components/Score";
import CommentBox from "./components/CommentBox";
import NextButton from "./components/NextButton";
// import Recommend from "./components/Recommend";

const Scoresection = () => {
  return (
    <div className="scoresection">
      <Candidate></Candidate>
      <Score></Score>
      <CommentBox></CommentBox>
      <NextButton></NextButton>
    </div>
  );
};

export default Scoresection;
