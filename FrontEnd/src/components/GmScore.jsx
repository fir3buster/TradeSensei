import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "./Chart.module.css";

const GmScore = () => {
    const [gmId, setGmId] = useState();
    const [allManagerRecords, setAllManagerRecords] = useState([]);
    const [gmRecommend, setGmRecommend] = useState(null)
    const userCtx = useContext(UserContext);
    const fetchData = useFetch();

    const getAllManagerRecordsByApplicantId = async () => {
        console.log("inside getallmanagerscore");
        console.log(userCtx.activeApplicantId);
        try {
            const res = await fetchData(
                "/api/managers/" + userCtx.activeApplicantId,
                "GET",
                undefined,
                userCtx.accessToken
            );
            if (res.ok) {
                console.log(res.data);
                setAllManagerRecords(res.data);
            } else {
                alert(JSON.stringify(res.data));
                console.log(res.data);
            }
        } catch (error) {
            console.error("error fetching final score:", error);
        }
    };

    const getGeneralManagersRecordsByApplicantId = async () => {
        try {
            const res = await fetchData(
                "/api/generalManagers/" + userCtx.activeApplicantId,
                "GET",
                undefined,
                userCtx.accessToken
            );
            if (res.ok) {
                console.log(res.data);
                for (const data of res.data) {
                    if (data.staffId === userCtx.activeStaffId) {
                        setGmId(data._id);
                    }
                }
            } else alert(JSON.stringify(res.data));
            console.log(res.data);
        } catch (error) {
            console.error("error fetching final score:", error);
        }
    };

    const UpdateGeneralManagerRecord = async (recommend) => {
        try {
            const res = await fetchData(
                "/api/managers/" + gmId,
                "PATCH",
                {
                    isRecommended: recommend
                },
                userCtx.accessToken
            );
            if (res.ok) {
                getScore();
            } else {
                alert(JSON.stringify(res.data));
                console.log(res.data);
            }
        } catch (error) {
            console.error("Error adding score:", error);
        }
    };

    const handleGmRecommend = (recommend) => {
        setGmRecommend(recommend);
        console.log("check recommend:" + recommend);
        UpdateGeneralManagerRecord(recommend);
    };

    useEffect(() => {
        getAllManagerRecordsByApplicantId();
        getGeneralManagersRecordsByApplicantId();
    }, []);

    return (
        <div className={styles.score}>
            {/* <div>{JSON.stringify(finalRecord)}</div>
            <div>{JSON.stringify(allManagerRecords)}</div> */}
            <div>
                {allManagerRecords &&
                    allManagerRecords.map((record) => {
                        const staffId = record.staffId;
                        const finalGrade = record.finalGrade;
                        const isRecommended = record.isRecommended;

                        return (
                            <div key={record._id}>
                                <p>Staff ID: {staffId}</p>{" "}
                                <p>Final Grade: {finalGrade}</p>
                                <p>
                                    Recommended: {isRecommended ? "Yes" : "No"}
                                </p>
                            </div>
                        );
                    })}
            </div>
            <br />
            <br />
            {/* <div>
                <button className={styles.nextbutton}>Recommend</button>
                <button className={styles.nextbutton}>Not recommended</button>
            </div> */}

            {gmRecommend === null ? (
                <div>
                    <button
                        className={styles.nextbutton}
                        onClick={() => handleGmRecommend(true)}
                    >
                        Recommend
                    </button>

                    <button
                        className={styles.nextbutton}
                        onClick={() => handleGmRecommend(false)}
                    >
                        Not recommended
                    </button>
                </div>
            ) : gmRecommend === true ? (
                <div>Recommended!</div>
            ) : (
                <div>Not Recommended!</div>
            )}
        </div>
    );
};

export default GmScore;
