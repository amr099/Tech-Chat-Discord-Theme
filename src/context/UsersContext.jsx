import React, { createContext, useState, useEffect } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import { db } from "./../../firebase-config";

export const UsersContext = createContext();

export default function UsersContextProvider({ children }) {
    const [users, setUsers] = useState();

    get(ref(db, `users`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                let users = [];

                for (let i in snapshot.val()) {
                    users.push(i);
                }
                setUsers(users);
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
    return (
        <UsersContext.Provider value={{ users }}>
            {children}
        </UsersContext.Provider>
    );
}
