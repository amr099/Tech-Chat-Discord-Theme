import { signInWithPopup } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { db, auth, provider } from "../../firebase-config";
import { AuthContext } from "../context/AuthContext";
import { ref, set, get, child } from "firebase/database";
import styled from "styled-components";
import { UsersContext } from "./../context/UsersContext";

const Img = styled.img`
    border-radius: 100%;
    width: 50px;
    height: 50px;
    align-self: center;
`;

export default function Login() {
    const { user, setUser } = useContext(AuthContext);
    const { users } = useContext(UsersContext);
    const [userInfo, setUserInfo] = useState();

    const login = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
                if (!users?.find((u) => u == result.user.uid)) {
                    // Set record into users collection.
                    set(ref(db, `users/${result.user.uid}`), {
                        uid: result.user?.uid,
                        name: result.user?.displayName,
                        email: result.user?.email,
                        img: result.user?.photoURL,
                        rooms: {}, //
                        notifications: {}, //
                    });
                }
            })
            .catch((e) => {
                console.log(`error:${e}`);
                return;
            });
    };

    const getUserInfo = () => {
        const dbRef = ref(db);
        get(child(dbRef, `users/${user.uid}`))
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
    };

    {
        user &&
            useEffect(() => {
                getUserInfo();
            }, [user]);
    }

    return (
        <>
            {userInfo ? (
                <Img src={userInfo.img} />
            ) : (
                <button onClick={login}>Login</button>
            )}
        </>
    );
}
