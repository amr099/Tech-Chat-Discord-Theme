import React, { createContext, useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../firebase-config";

export const RoomContext = createContext();

export default function RoomContextProvider({ children }) {
    const [room, setRoom] = useState();
    const [members, setMembers] = useState([]);

    const getMembers = () => {
        if (room) {
            try {
                const roomMembers = ref(db, `rooms/${room.name}/members`);
                onValue(roomMembers, (snapshot) => {
                    let members = [];
                    const data = snapshot.val();
                    for (let i in data) {
                        members.push(data[i].id);
                    }
                    setMembers(members);
                });
            } catch (e) {
                console.log(e);
            }
        }
    };

    useEffect(() => {
        getMembers();
    }, [room]);

    return (
        <RoomContext.Provider value={{ room, setRoom, members }}>
            {children}
        </RoomContext.Provider>
    );
}
