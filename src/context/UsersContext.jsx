import React, { createContext } from "react";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestoreDb } from "src/firebase-config";

export const UsersContext = createContext();

export default function UsersContextProvider({ children }) {
    const [users, loading, error, onSnapShot] = useCollectionData(
        collection(firestoreDb, "Users")
    );

    return (
        <UsersContext.Provider value={users}>{children}</UsersContext.Provider>
    );
}
