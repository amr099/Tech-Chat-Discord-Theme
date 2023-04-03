import React, { createContext } from "react";
import { firestoreDb } from "../../firebase-config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";

export const RoomsContext = createContext();

export default function RoomsContextProvider({ children }) {
    const roomsCol = collection(firestoreDb, "Rooms");
    const [rooms, loading, error, snapshot] = useCollectionData(roomsCol);

    return (
        <RoomsContext.Provider value={{ rooms }}>
            {children}
        </RoomsContext.Provider>
    );
}
