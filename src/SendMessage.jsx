import { ref, child, push, update } from "firebase/database";

import React, { useContext } from "react";
import { db } from "../firebase-config";
import { AuthContext } from "AuthContext";
import { RoomContext } from "./RoomContext";
import { useForm } from "react-hook-form";

export default function SendMessage() {
    const { room } = useContext(RoomContext);
    const { user } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    function send(data) {
        const msg = {
            sender: user?.displayName,
            msg: data.message,
        };

        const newPostKey = push(child(ref(db), "messages")).key;

        const updates = {};
        updates[`messages/${room}/${newPostKey}`] = msg;

        return update(ref(db), updates);
    }
    return (
        <form onSubmit={handleSubmit(send)}>
            <input {...register("message")} />
            <button type='submit'>Send</button>
        </form>
    );
}
