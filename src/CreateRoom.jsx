import React, { useContext } from "react";
import { ref, set, update, push, child } from "firebase/database";
import { db } from "./../firebase-config";
import { AuthContext } from "AuthContext";
import { useForm } from "react-hook-form";

export default function CreateRoom() {
    const { register, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
    function createRoom(data) {
        if (user) {
            try {
                try {
                    // Set new record into rooms collection.
                    set(ref(db, "rooms/" + data.roomName), {
                        name: data.roomName,
                        creatorName: user?.displayName,
                        creatorId: user?.uid,
                        members: {
                            id: user?.uid,
                            name: user?.displayName,
                        },
                    });
                } catch (e) {
                    console.log(e);
                    console.log("error setting new room into rooms collection");
                    return;
                }
                try {
                    // Set new record for newly created room into messages collection.
                    set(ref(db, "messages/" + data.roomName), {
                        msg1: `${data.roomName} has been created successfully`,
                    });
                } catch (e) {
                    console.log(e);
                    console.log(
                        "error setting new room into messages collection"
                    );

                    return;
                }
                try {
                    // Add new room into creator rooms.
                    const room = {
                        name: data.roomName,
                    };
                    const updates = {};
                    updates[`users/${user.uid}/rooms/`] = room;
                    return update(ref(db), updates);
                } catch (e) {
                    console.log(e);
                    console.log("error adding new room into creator's rooms");
                    return;
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
    return (
        <form onSubmit={handleSubmit(createRoom)}>
            <input {...register("roomName")} />
            <button type='submit'>New Room</button>
        </form>
    );
}
