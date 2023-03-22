import { ref, child, push, update } from "firebase/database";

import React, { useContext } from "react";
import { db } from "../firebase-config";
import { AuthContext } from "AuthContext";

export default function SendMessage() {
    const { user } = useContext(AuthContext);
    function send() {
        const msg = {
            sender: user?.displayName,
            msg: "Hey you!",
        };

        // Get a key for a new Post.
        const newPostKey = push(child(ref(db), "messages")).key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates["/messages/" + newPostKey] = msg;

        return update(ref(db), updates);
    }
    return <button onClick={send}>Send</button>;
}
