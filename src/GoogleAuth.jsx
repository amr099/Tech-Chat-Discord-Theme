import { signInWithPopup } from "firebase/auth";
import React, { useContext } from "react";
import { auth, provider } from "./../firebase-config";
import { AuthContext } from "./AuthContext";

export default function GoogleAuth() {
    const { setUser } = useContext(AuthContext);
    const login = () => {
        try {
            signInWithPopup(auth, provider)
                .then((result) => {
                    setUser(result.user);
                })
                .catch((e) => {
                    console.log(e);
                    return;
                });
        } catch (e) {
            console.log(e);
        }
    };
    return <button onClick={login}>Login</button>;
}
