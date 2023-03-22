import { ref, onValue } from "firebase/database";
import { db } from "../firebase-config";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "AuthContext";

export default function GetRoomMessages() {
    const [notifications, setNotifications] = useState();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const starCountRef = ref(db, `users/${user.displayName}/notifications`);
        onValue(starCountRef, (snapshot) => {
            let notifications = [];
            const data = snapshot.val();
            for (let i in data) {
                notifications.push(data[i]);
            }
            setNotifications(notifications);
        });
    }, [user]);

    return (
        <ul>
            {notifications?.map((n) => (
                <li>{n.msg}</li>
            ))}
        </ul>
    );
}
