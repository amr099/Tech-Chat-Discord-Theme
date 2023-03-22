import React, { createContext, useState } from "react";

export const RoomContext = createContext();

export default function RoomContextProvider({ children }) {
    const [room, setRoom] = useState();
    return (
        <RoomContext.Provider value={{ room, setRoom }}>
            {children}
        </RoomContext.Provider>
    );
}