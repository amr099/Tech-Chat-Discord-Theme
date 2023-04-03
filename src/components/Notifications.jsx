import {
    ref,
    update,
    onValue,
    push,
    child,
    get,
    remove,
} from "firebase/database";
import { db } from "../../firebase-config";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    width: 25%;
    top: 7vh;
    right: 2vw;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 50vh;
    padding: 2rem;
    border-radius: 10px;
    background-color: #f0f2f5;
    color: #000;
`;

const Flex = styled.div`
    width: ${(props) => props.width};
    flex-grow: ${(props) => props.grow};
    display: flex;
    gap: 10px;
    justify-content: ${(props) => props.justfiy};
    align-items: ${(props) => props.align};
    flex-direction: ${(props) => props.direction};
    padding: 10px;
    border-radius: 20px 20px;
    &:hover {
        background-color: #eee;
    }
`;

const Img = styled.img`
    height: 30px;
    width: 30px;
    border-radius: 50%;
    align-self: center;
`;

const Note = styled.p`
    line-height: 1.2;
`;

const Span = styled.span`
    font-weight: bold;
`;

const Button = styled.button`
    padding: 10px 20px;
    font-weight: bold;
    border-radius: 20px 20px;

    &:hover {
        cursor: pointer;
        background-color: green;
        color: #fff;
    }
`;

export default function Notifications() {
    const [notifications, setNotifications] = useState();
    const { userData } = useContext(AuthContext);

    useEffect(() => {
        const notes = ref(db, `users/${userData.id}/notifications`);
        onValue(
            notes,
            (snapshot) => {
                let notifications = [];
                const data = snapshot.val();
                for (let i in data) {
                    notifications.push(data[i]);
                }
                setNotifications(notifications);
                console.log(notifications);
            }
            // { onlyOnce: true }
        );
    }, []);

    const updateUserRooms = (id, roomName, roomId) => {
        try {
            const newRoomKey = push(child(ref(db), `users/${id}/rooms/`)).key;
            const updates = {};
            updates[`users/${id}/rooms/${roomId}/`] = {
                id: roomId,
                name: roomName,
                status: "member",
            };
            return update(ref(db), updates);
        } catch (e) {
            console.log(e);
            console.log("error adding room to users rooms ");
        }
    };

    const updateRoomMembers = (id, name, room) => {
        try {
            const newUserKey = push(
                child(ref(db), `rooms/${room}/members/`)
            ).key;
            const updates = {};
            updates[`rooms/${room}/members/${id}/`] = {
                id: id,
                name: name,
                status: "member",
            };
            return update(ref(db), updates);
        } catch (e) {
            console.log(e);
            console.log("error adding user to room members");
        }
    };
    const sendAcceptNote = (id, room) => {
        try {
            const newNoteKey = push(
                child(ref(db), `users/${id}/notifications/`)
            ).key;
            const updates = {};
            updates[`users/${id}/notifications/${newNoteKey}/`] = {
                id: newNoteKey,
                note: `You have joined room : ${room}!`,
            };
            return update(ref(db), updates);
        } catch (e) {
            console.log(e);
            console.log("error send user acceptance note");
        }
    };

    const accept = (name, id, roomName, roomId) => {
        updateUserRooms(id, roomName, roomId);
        updateRoomMembers(id, name, roomName);
        sendAcceptNote(id, roomName);
    };

    const onDelete = async (id) => {
        remove(ref(db, `users/${userData.id}/notifications/${id}`));
    };

    return (
        // <ul>
        //     {notifications?.map((n) => (
        //         <li>
        //             {n.userName} wanna join room {n.room}
        //             <button
        //                 onClick={() => accept(n.userName, n.userID, n.room)}
        //             >
        //                 accept
        //             </button>
        //         </li>
        //     ))}
        // </ul>

        <Container>
            <h2>Notifications</h2>

            {notifications?.map((note) => (
                <Flex justfiy={"between"} align={"center"}>
                    <div>{note.userImg && <Img src={note.userImg}></Img>}</div>
                    <Note>
                        {" "}
                        <Span>{note.note}</Span>{" "}
                    </Note>

                    {note.userImg && (
                        <Button
                            onClick={() =>
                                accept(
                                    note.userName,
                                    note.userID,
                                    note.roomName,
                                    note.roomId
                                )
                            }
                        >
                            Accept
                        </Button>
                    )}
                    <button onClick={() => onDelete(note.id)}>x</button>
                </Flex>
            ))}
        </Container>
    );
}
