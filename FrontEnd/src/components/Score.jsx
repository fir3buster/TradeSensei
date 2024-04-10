import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./Chart.module.css";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./ScoreStyles";
import FinalScore from "./FinalScore";
import GmScore from "./GmScore";
import ChartFunctionsContext from "../context/ChartFunctionsContext";

const Score = ({ totalPages }) => {
  const userCtx = useContext(UserContext);
  const [rate, setRate] = useState(0);
  const [score, setScore] = useState([]);
  const [comment, setComment] = useState("");
  const [finalScoreSubmitted, setFinalScoreSubmitted] = useState(false);
  const { nextPage, prevPage, resetRateAndComment } = useContext(
    ChartFunctionsContext
  );
  const fetchData = useFetch();

  const getScore = async () => {
    const res = await fetchData(
      "/api/applicants",
      "GET",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      setScore(res.data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const addScore = async (pageNumber) => {
    const res = await fetchData(
      "/api/applicants/managers/" + pageNumber,
      "PATCH",
      {
        applicantId: userCtx.activeApplicantId,
        staffId: userCtx.activeStaffId,
        grade: rate,
        comment: comment,
      },
      userCtx.accessToken
    );
    if (res.ok) {
      getScore();
      nextPage();
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const createManagerRecord = async () => {
    try {
      const res = await fetchData(
        "/api/managers/",
        "POST",
        {
          staffId: userCtx.activeStaffId,
          applicantId: userCtx.activeApplicantId,
        },
        userCtx.accessToken
      );

      if (res.ok) {
      } else {
        alert(JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Error creating manager:", error);
    }
  };

  const createGeneralManagerRecord = async () => {
    try {
      const res = await fetchData(
        "/api/generalManagers/",
        "POST",
        {
          applicantId: userCtx.activeApplicantId,
        },
        userCtx.accessToken
      );

      if (res.ok) {
      } else {
        alert(JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Error creating general manager: ", error);
    }
  };

  useEffect(() => {
    getScore();
  }, []);

  useEffect(() => {
    resetRateAndComment();
  }, []);

  useEffect(() => {
    getScore();
    let recordNumber = -1;
    for (const record in score) {
      if (
        score[record]["pageNumber"] === userCtx.activePageContext &&
        score[record]["applicantId"] === userCtx.activeApplicantId
      ) {
        recordNumber = record;
      }
    }

    if (score[recordNumber]) {
      if (score[recordNumber]["managers"]) {
        setComment("");
        setRate(0);
        for (const manager in score[recordNumber]["managers"]) {
          if (
            score[recordNumber]["managers"][manager]["staffId"] ===
            userCtx.activeStaffId
          ) {
            setComment(score[recordNumber]["managers"][manager]["comment"]);
            setRate(score[recordNumber]["managers"][manager]["grade"]);
          }
        }
      }
    }
  }, [userCtx.activePageContext]);

  const handleSubmitAllScores = () => {
    setFinalScoreSubmitted(true);
    createManagerRecord();
    createGeneralManagerRecord();
  };

  return (
    <div className={styles.score}>
      {userCtx.role === "general manager" ? (
        <GmScore />
      ) : finalScoreSubmitted ? (
        <FinalScore />
      ) : (
        <div>
          <Container>
            <div className="">
              <div className={styles.scoregrade}>
                What is your grade for this trade?
              </div>
              {[...Array(5)].map((item, index) => {
                const givenRating = index + 1;
                return (
                  <label key={index}>
                    <Radio
                      type="radio"
                      value={givenRating}
                      onClick={() => {
                        setRate(givenRating);
                      }}
                    />
                    <Rating>
                      <FaStar
                        color={
                          givenRating <= rate ? "#FFD700" : "rgb(192,192,192)"
                        }
                      />
                    </Rating>
                  </label>
                );
              })}
            </div>
          </Container>

          <div className={styles.box}>
            <div className="">Your comment:</div>
            <textarea
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={styles.box}
            />
          </div>

          <div>
            <button
              onClick={() => {
                addScore(userCtx.activePageContext);
                if (userCtx.activePageContext === totalPages) {
                  handleSubmitAllScores();
                }
              }}
              className={styles.button}
            >
              {userCtx.activePageContext === totalPages
                ? "Submit All Scores"
                : "Grade"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Score;
