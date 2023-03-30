import { ref, update, onValue, push, child } from "firebase/database";
import { db } from "../../firebase-config";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    top: 9vh;
    right: 9vw;
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: 50vh;
    padding: 2rem;
    border-radius: 10px;
    background-color: #eee;
    color: #000;
`;

const Notification = styled.div`
    display: flex;
    justify-content: space-between;
    align-self: start;
`;

const Img = styled.img`
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin-right: 10px;
    align-self: center;
`;

const Button = styled.button`
    margin-left: 10px;
    padding: 20px 20px;
    font-weight: bold;
    border-radius: 20%;

    &:hover {
        cursor: pointer;
        background-color: green;
        color: #fff;
    }
`;

export default function Notifications() {
    const [notifications, setNotifications] = useState();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const notifications = ref(db, `users/${user.uid}/notifications`);
        onValue(notifications, (snapshot) => {
            let notifications = [];
            const data = snapshot.val();
            for (let i in data) {
                notifications.push(data[i]);
            }
            setNotifications(notifications);
        });
    }, [user]);

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
            updates[`rooms/${room}/members/${newUserKey}/`] = {
                id: id,
                name: name,
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
                <Notification key={note.id}>
                    {note.userImg && <Img src={note.userImg}></Img>}
                    <h4>{note.note}</h4>
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
                </Notification>
            ))}
        </Container>
    );
}
