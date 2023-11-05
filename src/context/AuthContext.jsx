import React, { createContext, useEffect, useState } from "react";
import { auth, firestoreDb } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useRef } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [userData, setUserData] = useState();
  const id = useRef();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        id.current = user.uid;
        onSnapshot(doc(firestoreDb, "Users", user.uid), (doc) => {
          setUserData(doc.data());
        });
        updateDoc(doc(firestoreDb, "Users", user.uid), {
          status: "online",
        });
      } else {
        await updateDoc(doc(firestoreDb, "Users", id.current), {
          status: "offline",
        });
        setUserData(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
