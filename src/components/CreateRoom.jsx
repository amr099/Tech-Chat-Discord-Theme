import React, { useContext } from "react";
import { ref, set, update, push, child } from "firebase/database";
import { db } from "../../firebase-config";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

export const Container = styled.div`
    display: flex;
    border-bottom: 1px solid #909090;
    margin-bottom: 2rem;
    &::focued {
        outline: none;
    }
`;

const Input = styled.input`
    all: unset;
    font-size: 1.2rem;
    padding: 1rem;
    background-color: inherit;
    width: 100%;
    &::placeholder {
        color: #cacaca;
    }
`;

export default function CreateRoom({ rooms }) {
    const { register, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
    function onSubmit(data) {
        if (user.displayName) {
            if (!rooms.find((r) => r.name === data.roomName)) {
                try {
                    const roomId = uuid();
                    try {
                        // Set new record into rooms collection.
                        set(ref(db, "rooms/" + data.roomName), {
                            id: roomId,
                            name: data.roomName,
                            creatorName: user.displayName,
                            creatorId: user.uid,
                            members: {},
                        });
                    } catch (e) {
                        console.log(e);
                        console.log(
                            "error setting new room into rooms collection"
                        );
                    }
                    try {
                        const members = {
                            id: user.uid,
                            name: user.displayName,
                        };

                        const newMemberKey = push(
                            child(ref(db), `rooms/${data.roomName}/members`)
                        ).key;
                        const updates = {};
                        updates[
                            `rooms/${data.roomName}/members/${newMemberKey}/`
                        ] = members;
                        update(ref(db), updates);
                    } catch (e) {
                        console.log(e);
                    }

                    try {
                        // Set new record for newly created room into messages collection.
                        set(ref(db, "messages/" + data.roomName), {
                            creationMsg: {
                                user: user?.displayName,
                                uid: user?.uid,
                                userImg: user?.photoURL,
                                msg: `${user.displayName} has created '${data.roomName}' successfully.`,
                                time: new Date().toLocaleString(),
                            },
                        });
                    } catch (e) {
                        console.log(e);
                        console.log(
                            "error setting new room into messages collection"
                        );
                    }
                    try {
                        // Add new room into creator rooms.
                        const newRoomKey = push(
                            child(ref(db), `users/${user.uid}/rooms`)
                        ).key;
                        const updates = {};
                        updates[`users/${user.uid}/rooms/${roomId}`] = {
                            id: roomId,
                            name: data.roomName,
                            status: "owner",
                        };
                        return update(ref(db), updates);
                    } catch (e) {
                        console.log(e);
                        console.log(
                            "error adding new room into creator's rooms"
                        );
                    }
                } catch (e) {
                    console.log(e);
                }
            } else {
                alert("this room name is already used.");
            }
        } else {
            alert("You have to log in first.");
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container>
                <Input
                    {...register("roomName")}
                    placeholder='Create new room ...'
                />
                <button type='submit'>
                    <i class='bi bi-plus'></i>
                </button>
            </Container>
        </form>
    );
}

// Create Room Proccess :
//  - You should be logged in
//  - can't create room with repeated name.
//  - if room entered :
//      - set new record into rooms object has (id,name,creatorName,creatorId)
//      - update members to contain creator.
//      - set record into messages object has creationMessage
//      - set record into user's rooms has room's info.
