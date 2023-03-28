import { ref, update, onValue } from "firebase/database";

import { db } from "../../firebase-config";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function GetRoomMessages() {
    const [notifications, setNotifications] = useState();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const notifications = ref(db, `users/${user.uid}/notifications`);
        onValue(notifications, (snapshot) => {
            let notifications = [];
            const data = snapshot.val();
            for (let i in data) {
                notifications.push(data[i]);
            }
            setNotifications(notifications);
        });
    }, [user]);

    const updateUserRooms = (id, room) => {
        try {
            const updates = {};
            updates[`users/${id}/rooms/`] = { name: room };
            return update(ref(db), updates);
        } catch (e) {
            console.log(e);
            console.log("error adding room to users rooms ");
            return;
        }
    };

    const updateRoomMembers = (id, name, room) => {
        try {
            const updates = {};
            updates[`rooms/${room}/members/${id}/`] = { id: id, name: name };
            return update(ref(db), updates);
        } catch (e) {
            console.log(e);
            console.log("error adding user to room members");
            return;
        }
    };

    const accept = (name, id, room) => {
        updateUserRooms(id, room);
        updateRoomMembers(id, name, room);
    };

    return (
        <ul>
            {notifications?.map((n) => (
                <li>
                    {n.userName} wanna join room {n.room}
                    <button
                        onClick={() => accept(n.userName, n.userID, n.room)}
                    >
                        accept
                    </button>
                </li>
            ))}
        </ul>
    );
}
