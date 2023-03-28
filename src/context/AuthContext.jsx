import React, { createContext, useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase-config";
export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState(auth);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}
