import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const Registration = (props) => {
    const fetchData = useFetch();

    const [roles, setRoles] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const getRoles = async () => {
        const res = await fetchData("/roles", "GET");
        if (res.ok) {
            setRoles(res.data);
        } else {
            console.log(res.data);
        }
    };

    const registerUser = async () => {
        const res = await fetchData("/auth/register", "PUT", {
            email,
            password,
            role,
        });

        if (res.ok) {
            setEmail("");
            setPassword("");
            setRole("");
        } else {
            console.log(res.data);
        }
    };

    useEffect(() => {
        getRoles();
    }, []);

    return (
        <>
            <br />
            <div className="row">
                <div className="col-md-4"></div>
                <input
                    className="col-md-4"
                    placeholder="email"
                    type="text"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <div className="col-md-4"></div>
            </div>

            <div className="row">
                <div className="col-md-4"></div>
                <input
                    className="col-md-4"
                    placeholder="password"
                    type="text"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <div className="col-md-4"></div>
            </div>

            <div className="row">
                <div className="col-md-4"></div>
                <select name="roles" id="roles" className="col-md-4">
                    <option value="none">please select</option>
                    {roles.map((item) => {
                        return (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        );
                    })}
                </select>
                <div className="col-md-4"></div>
            </div>

            <div className="row">
                <div className="col-md-4"></div>
                <button
                    className="col-md-4"
                    type="submit"
                    onClick={registerUser}
                >
                    register
                </button>
                <div className="col-md-4"></div>
            </div>

            <div className="row">
                <div className="col-md-4"></div>
                <button
                    className="col-md-4"
                    type="submit"
                    onClick={() => props.setShowLogin(true)}
                >
                    go to login screen
                </button>
                <div className="col-md-4"></div>
            </div>
        </>
    );
};

export default Registration;
