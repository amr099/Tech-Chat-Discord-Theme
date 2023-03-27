import { signInWithPopup } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { db, auth, provider } from "../firebase-config";
import { AuthContext } from "./AuthContext";
import { ref, set } from "firebase/database";

export default function Login() {
    const { setUser } = useContext(AuthContext);

    const login = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // Set record into users collection.
                set(ref(db, `users/${result.user.uid}`), {
                    uid: result.user?.uid,
                    name: result.user?.displayName,
                    email: result.user?.email,
                    img: result.user?.photoURL,
                });
                setUser(result.user);
            })

            .catch((e) => {
                console.log(`error:${e}`);
                return;
            });
    };

    useEffect(() => {
        console.log(user);
    }, [user]);
    return <button onClick={login}>Login</button>;
}
