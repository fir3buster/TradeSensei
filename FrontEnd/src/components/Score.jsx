import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./Chart.module.css";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./ScoreStyles";
import FinalScore from "./FinalScore";
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
            // console.log("getScore=" + JSON.stringify(res.data))
            setScore(res.data);
        } else {
            alert(JSON.stringify(res.data));
            console.log(res.data);
        }
    };

    const addScore = async (pageNumber) => {
        console.log(userCtx.activeApplicantId);
        console.log(userCtx.activePageContext, pageNumber, rate, comment);
        // console.log("patch data=" + rate + comment);
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
            console.log(res.data)
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

    useEffect(() => {
        console.log("triggered");
        getScore();
        console.log("userCtx.activePageContext=" + userCtx.activePageContext);

        console.log("total record=" + score.length)
        let recordNumber=-1
        for (const record in score){
            if (
            (score[record]["pageNumber"]===(userCtx.activePageContext+1)) &&
            (score[record]["applicantId"]===(userCtx.activeApplicantId))
            ){
                recordNumber=record
            }
        }

        if (score[recordNumber]) {
            console.log("score[recordNumber]=" + JSON.stringify(score[recordNumber]));
            console.log("managers=" + JSON.stringify(score[recordNumber]["managers"]));
            console.log("score[recordNumber][pageNumber]=" + JSON.stringify(score[recordNumber]["pageNumber"]));
            console.log("userCtx.role=" + userCtx.role);
            console.log("userCtx.activeStaffId=" + userCtx.activeStaffId);
            if (score[recordNumber]["managers"]) {
                console.log("into managers");
                for (const manager in score[recordNumber]["managers"])
                if (score[recordNumber]["managers"][manager]["staffId"] === userCtx.activeStaffId) {
                    console.log("grade=" +score[recordNumber]["managers"][manager]["grade"]);
                    console.log("comment=" +score[recordNumber]["managers"][manager]["comment"]);
                    setComment(score[recordNumber]["managers"][manager]["comment"])
                    setRate(score[recordNumber]["managers"][manager]["grade"])
                }
            }
        }
    }, [userCtx.activePageContext]);

    const handleSubmitAllScores = () => {
        setFinalScoreSubmitted(true);
    };

    return (
        <div className={styles.score}>
            {finalScoreSubmitted ? (
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
                                                    givenRating <= rate
                                                        ? "#FFD700"
                                                        : "rgb(192,192,192)"
                                                }
                                            />
                                        </Rating>
                                    </label>
                                );
                            })}
                        </div>
                    </Container>

                    <div className={styles.commentbox}>
                        <div className="">Your comment:</div>
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
                                addScore(userCtx.activePageContext + 1);
                                // nextPage();
                                setComment("");
                                if (
                                    userCtx.activePageContext ===
                                    totalPages - 1
                                ) {
                                    handleSubmitAllScores();
                                }
                            }}
                            className={styles.button}
                        >
                            {userCtx.activePageContext === totalPages - 1
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
