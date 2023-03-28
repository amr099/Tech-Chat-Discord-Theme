import React, { useEffect, useState, useContext } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase-config";
import { RoomContext } from "../context/RoomContext";

export default function Users() {
    const [users, setUsers] = useState([]);
    const { room } = useContext(RoomContext);

    useEffect(() => {
        const usersCol = ref(db, `rooms/${room}/members`);
        onValue(usersCol, (snapshot) => {
            const data = snapshot.val();
            let users = [];
            for (let i in data) {
                users.push(data[i]);
            }
            setUsers(users);
        });
    }, []);
    return (
        <>
            <h3>Users</h3>
            <ul>
                {users?.map((user) => (
                    <li>{user.name}</li>
                ))}
            </ul>
        </>
    );
}
