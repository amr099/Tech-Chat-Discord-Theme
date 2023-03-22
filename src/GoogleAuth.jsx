import { signInWithPopup } from "firebase/auth";
import React, { useContext } from "react";
import { db, auth, provider } from "./../firebase-config";
import { AuthContext } from "./AuthContext";
import { ref, set } from "firebase/database";

export default function GoogleAuth() {
    const { user, setUser } = useContext(AuthContext);
    const login = () => {
        try {
            signInWithPopup(auth, provider)
                .then((result) => {
                    setUser(result.user);
                    set(ref(db, "users/" + result.user.displayName), {
                        name: result.user.displayName,
                        email: result.user?.email,
                        notifications: {
                            creation: "this email created at ...",
                        },
                    });
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
