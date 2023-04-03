import React, { createContext, useEffect, useState } from "react";
import { auth, firestoreDb } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, onSnapshot } from "firebase/firestore";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    // const [userId, setUserId] = useState();
    const [userData, setUserData] = useState();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            onSnapshot(doc(firestoreDb, "Users", user.uid), (doc) => {
                setUserData(doc.data());
            });
        } else {
            setUserData(false);
        }
    });

    return (
        <AuthContext.Provider value={{ userData }}>
            {children}
        </AuthContext.Provider>
    );
}
