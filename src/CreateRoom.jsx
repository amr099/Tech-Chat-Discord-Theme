import React, { useContext } from "react";
import { ref, set } from "firebase/database";
import { db } from "./../firebase-config";
import { AuthContext } from "AuthContext";
import { useForm } from "react-hook-form";

export default function CreateRoom() {
    const { register, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
    function createRoom(data) {
        if (user) {
            set(ref(db, "rooms/" + data.roomName), {
                name: data.roomName,
                creator: user?.displayName,
                members: {
                    name: user?.displayName,
                },
            });
            set(ref(db, "messages/" + data.roomName), {
                msg1: `${data.roomName} has been created successfuly`,
            });
        }
    }
    return (
        <form onSubmit={handleSubmit(createRoom)}>
            <input {...register("roomName")} />
            <button type='submit'>New Room</button>
        </form>
    );
}
