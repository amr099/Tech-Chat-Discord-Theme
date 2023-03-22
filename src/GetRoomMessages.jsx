import { ref, onValue } from "firebase/database";
import { db } from "../firebase-config";

import React, { useState, useContext, useEffect } from "react";
import { RoomContext } from "./RoomContext";

export default function GetRoomMessages() {
    const [messages, setMessages] = useState();
    const { room } = useContext(RoomContext);

    useEffect(() => {
        const starCountRef = ref(db, `messages/${room}/`);
        onValue(starCountRef, (snapshot) => {
            let messages = [];
            const data = snapshot.val();
            console.log(data);
            for (let i in data) {
                messages.push(data[i]);
            }
            setMessages(messages);
        });
    }, [room]);

    return (
        <ul>
            {messages?.map((m) => (
                <li>
                    {m.sender}:{m.msg}
                </li>
            ))}
        </ul>
    );
}
