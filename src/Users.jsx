import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase-config";

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const starCountRef = ref(db, "users/");
        onValue(starCountRef, (snapshot) => {
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
