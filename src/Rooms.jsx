import React, { useEffect, useState, useContext } from "react";
import { db } from "../firebase-config";
import { RoomContext } from "./RoomContext";
import { AuthContext } from "AuthContext";
import { ref, child, push, update, onValue } from "firebase/database";

export default function Rooms() {
    const { room, setRoom } = useContext(RoomContext);
    const { user } = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);

    const join = (creator, room) => {
        const req = {
            user: user?.displayName,
            msg: `${user?.displayName} wanna join ${room}`,
        };

        const newPostKey = push(child(ref(db), "messages")).key;

        const updates = {};
        updates[`users/${creator}/notifications/${newPostKey}`] = req;

        return update(ref(db), updates);
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
                        <button onClick={() => join(room.creator, room.name)}>
                            Join
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}
