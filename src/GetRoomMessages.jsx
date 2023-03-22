import { ref, onValue } from "firebase/database";
import { db } from "../firebase-config";

import React from "react";

export default function GetRoomMessages() {
    const getMessages = () => {
        const starCountRef = ref(db, "rooms/", "room1");
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            // updateStarCount(postElement, data);
            console.log(data);
        });
    };
    return <button onClick={getMessages}>Get Messages</button>;
}
