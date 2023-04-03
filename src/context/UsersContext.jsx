import React, { createContext } from "react";
import { firestoreDb } from "../../firebase-config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";

export const UsersContext = createContext();

export default function UsersContextProvider({ children }) {
    const usersCol = collection(firestoreDb, "Users");
    const [users, loading, error, snapshot] = useCollectionData(usersCol);

    return (
        <UsersContext.Provider value={{ users }}>
            {children}
        </UsersContext.Provider>
    );
}
