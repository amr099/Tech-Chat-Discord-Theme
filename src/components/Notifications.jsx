import {
    ref,
    update,
    onValue,
    push,
    child,
    get,
    remove,
} from "firebase/database";
import { db, firestoreDb } from "../../firebase-config";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";

const Container = styled.div`
    user-select: none;
    position: absolute;
    min-height: 50vh;
    max-height: 70vh;
    overflow: auto;
    width: 30%;
    top: 7vh;
    right: 2vw;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 10px;
    padding: 1rem;
    background-color: #f0f2f5;
    color: #000;
    z-index: 1;
`;

const Flex = styled.div`
    display: flex;
    gap: 10px;
    justify-content: ${(props) => props.justfiy};
    align-items: ${(props) => props.align};
    flex-direction: ${(props) => props.direction};
    padding: 10px;
    &:hover {
        background-color: #f4f4f4;
    }
`;

const Img = styled.img`
    height: 30px;
    width: 30px;
    border-radius: 50%;
`;

const Note = styled.p`
    word-break: keep-all;
    font-weight: 700;
`;

const Accept = styled.i`
    font-size: 1.5rem;
    &:hover {
        cursor: pointer;
        color: #0f0;
    }
`;
const Remove = styled.i`
    font-size: 1.5rem;
    &:hover {
        cursor: pointer;
        color: #f00;
    }
`;

export default function Notifications() {
    const [notifications, setNotifications] = useState();
    const { userData } = useContext(AuthContext);

    useEffect(() => {
        onSnapshot(doc(firestoreDb, "Users", userData.id), (doc) => {
            setNotifications(doc.data().notifications);
        });
    }, []);

    const updateUserRooms = (id, room) => {
        try {
            const userDoc = doc(firestoreDb, "Users", id);
            updateDoc(userDoc, {
                rooms: arrayUnion(room),
            });
        } catch (e) {}
    };

    const updateRoomMembers = (id, room) => {
        try {
            const roomDoc = doc(firestoreDb, "Rooms", room);
            updateDoc(roomDoc, {
                members: arrayUnion(id),
            });
        } catch (e) {}
    };
    const sendAcceptNote = (id, room) => {
        try {
            const userDoc = doc(firestoreDb, "Users", id);
            updateDoc(userDoc, {
                notifications: arrayUnion({
                    note: `You have joined room : ${room}!`,
                }),
            });
        } catch (e) {}
    };

    const accept = (id, room) => {
        updateUserRooms(id, room);
        updateRoomMembers(id, room);
        sendAcceptNote(id, room);
    };

    // const onDelete = async (id) => {
    //     const userDoc = doc(firestoreDb, "Users", userData.id);
    //     updateDoc(userDoc, {
    //         notifications: removeUnion(''),
    //     });
    // };

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
                <Flex justfiy={"space-between"} align={"center"}>
                    <Flex align={"center"}>
                        {note.userImg && <Img src={note.userImg}></Img>}
                        <Note>{note.note}</Note>
                    </Flex>
                    <Flex align={"center"}>
                        {note.userImg && (
                            <>
                                <Accept
                                    className='bi bi-check-circle'
                                    onClick={() =>
                                        accept(note.userID, note.roomName)
                                    }
                                ></Accept>
                            </>
                        )}
                        <Remove
                            className='bi bi-x'
                            onClick={() => onDelete(note.id)}
                        ></Remove>
                    </Flex>
                </Flex>
            ))}
        </Container>
    );
}
