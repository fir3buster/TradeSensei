import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./ScoreStyles";
import styles from "./Chart.module.css";
import ChartFunctionsContext from "../context/ChartFunctionsContext";
import Recommend from "./Recommend";

const Score = () => {
  const userCtx = useContext(UserContext);
  const [rate, setRate] = useState(0);
  const [score, setScore] = useState([]);
  const [comment, setComment] = useState("");
  const [data, setData] = useState(null);
  const { nextPage, prevPage, resetRateAndComment } = useContext(
    ChartFunctionsContext
  );
  const fetchData = useFetch();
  // const [context, setContext] = useContext(UserContext);

  // const idRef = useRef();
  // const gradeRef = useRef();
  // const yearRef = useRef();

  const getScore = async () => {
    const res = await fetchData(
      "/api/applicants",
      "GET",
      null,
      userCtx.accessToken
    );
    if (res.ok) {
      setScore(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const addScore = async () => {
    const res = await fetchData(
      "/api/applicants",
      "POST",
      {
        applicantId: userCtx,
        grade: rate,
        comment: comment,
      },
      userCtx.accessToken
    );
    if (res.ok) {
      getScore();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getScore();
  }, []);

  useEffect(() => {
    resetRateAndComment();
  }, []);

  return (
    <div className="">
      <div>
        <Container>
          <div className={styles.titlestars}>
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
                      // alert(`Are you sure you want to give ${givenRating} stars ?`);
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
      </div>
      <div className={styles.commentbox}>
        <div className={styles.comment}>Your comment - optional:</div>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={styles.box}
        />
      </div>
      <div>
        <button
          onClick={() => {
            addScore();
            nextPage();
            setComment();
          }}
          className={styles.button}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Score;
