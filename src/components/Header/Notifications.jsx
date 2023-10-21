import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { doc, onSnapshot } from "firebase/firestore";
import { firestoreDb } from "src/firebase-config";
import { AuthContext } from "src/context/AuthContext";
import Notification from "./Notification";

const Container = styled.div`
    user-select: none;
    position: absolute;
    height: 70vh;
    overflow: auto;
    width: 30%;
    top: 6vh;
    right: 7vw;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 10px;
    padding: 1rem;
    background-color: var(--semi-dark);
    color: #000;
    z-index: 1;
`;

const H3 = styled.h3`
    color:var(--light);
    font: var(--md) main-bold;
`

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const { userData } = useContext(AuthContext);

    useEffect(() => {
        onSnapshot(doc(firestoreDb, "Users", userData.id), (doc) => {
            setNotifications(doc.data().notifications);
        });
    }, []);

    return (
        <Container>
            <H3>Notifications</H3>
            {notifications?.map((note) => (
                <Notification
                    noteObj={note}
                    userImg={note.userImg}
                    note={note.note}
                    time={note.time}
                />
            ))}
        </Container>
    );
}
