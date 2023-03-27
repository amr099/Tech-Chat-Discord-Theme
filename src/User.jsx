import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "AuthContext";
import { ref, child, get } from "firebase/database";
import { db } from "../firebase-config";
import styled from "styled-components";

const Img = styled.img`
    border-radius: 100%;
    width: 50px;
    height: 50px;
    align-self: center;
`;

export default function User() {
    const { user } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        const dbRef = ref(db);
        get(child(dbRef, `users/${user?.currentUser?.uid}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setUserInfo(snapshot.val());
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return <Img src={userInfo?.img} />;
}
