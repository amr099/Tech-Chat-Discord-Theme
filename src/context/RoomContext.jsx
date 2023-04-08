import React, { createContext, useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db, firestoreDb } from "../../firebase-config";
import { onSnapshot, doc } from "firebase/firestore";

export const RoomContext = createContext();

export default function RoomContextProvider({ children }) {
    const [room, setRoom] = useState();
    const [messages, setMessages] = useState();
    const [members, setMembers] = useState([]);

    const getMembers = () => {
        // if (room) {
        //     try {
        //         const roomMembers = ref(db, `rooms/${room.name}/members`);
        //         onValue(roomMembers, (snapshot) => {
        //             let members = [];
        //             const data = snapshot.val();
        //             for (let i in data) {
        //                 members.push(data[i]?.id);
        //             }
        //             setMembers(members);
        //         });
        //     } catch (e) {
        //         console.log(e);
        //     }
        // }
        if (room) {
            onSnapshot(doc(firestoreDb, "Rooms", room.name), (doc) => {
                setMembers(doc.data().members);
            });
        }
    };
    const getMessages = () => {
        if (room) {
            const messages = ref(db, `messages/${room.name}/`);
            onValue(messages, (snapshot) => {
                const data = snapshot.val();
                let messages = [];
                for (let i in data) {
                    messages.push(data[i]);
                }
                setMessages(
                    messages.sort((a, b) => {
                        const date1 = new Date(a.time);
                        const date2 = new Date(b.time);
                        return date1 - date2;
                    })
                );
            });
        }
    };

    useEffect(() => {
        getMembers();
        getMessages();
    }, [room]);

    return (
        <RoomContext.Provider value={{ room, setRoom, members, messages }}>
            {children}
        </RoomContext.Provider>
    );
}
