import { signInWithPopup } from "firebase/auth";
import React, { useContext } from "react";
import { db, auth, provider } from "../firebase-config";
import { AuthContext } from "./AuthContext";
import { ref, set } from "firebase/database";

export default function Login() {
    const { setUser } = useContext(AuthContext);

    const login = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
            })
            .then(() => {
                // Set record into users collection.
                set(ref(db, `users/${result.user.uid}`), {
                    uid: result.user?.uid,
                    name: result.user?.displayName,
                    email: result.user?.email,
                    img: result.user?.photoURL,
                });
            })
            .catch((e) => {
                console.log(e);
                return;
            });
    };
    return <button onClick={login}>Login</button>;
}
