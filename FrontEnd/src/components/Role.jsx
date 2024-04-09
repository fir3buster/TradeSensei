import React, { useContext, useState, useEffect } from "react";
import styles from "./Chart.module.css";
import UserContext from "../context/user";

const Role = (props) => {
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
                <div className={styles.user}>Role - Manager</div>
                <button onClick={toggleUserDropDown}>
                    {userCtx.activeStaffId}
                </button>

                {isUserDropDown && (
                    <div>
                        <button onClick={signOut}>Sign Out</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Role;
