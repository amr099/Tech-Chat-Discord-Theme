import React, { useEffect, useState, useContext } from "react";
import { db } from "../firebase-config";
import { RoomContext } from "./RoomContext";
import { AuthContext } from "AuthContext";
import { ref, child, push, update, onValue } from "firebase/database";

export default function Rooms() {
    const { room, setRoom } = useContext(RoomContext);
    const { user } = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);

    const join = (creatorId, room) => {
        try {
            const newNotificationKey = push(
                child(ref(db), `users/${creatorId}`)
            ).key;

            const joinRequest = {
                id: newNotificationKey,
                userName: user?.displayName,
                userID: user?.uid,
                room: room,
            };

            const updates = {};
            updates[`users/${creatorId}/notifications/${newNotificationKey}/`] =
                joinRequest;

            return update(ref(db), updates);
        } catch (e) {
            console.log(e);
            console.log("error sending request to join", room);
        }
    };

    useEffect(() => {
        const starCountRef = ref(db, "rooms/");
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            let rooms = [];
            for (let i in data) {
                rooms.push(data[i]);
            }
            setRooms(rooms);
        });
    }, []);
    return (
        <>
            <h3>Selected Room : {room}</h3>
            <ul>
                {rooms?.map((room) => (
                    <li onClick={() => setRoom(room.name)}>
                        {room.name}{" "}
                        <button onClick={() => join(room.creatorId, room.name)}>
                            Join
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}
