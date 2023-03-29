import React, { useContext, useState, useEffect } from "react";
import Messages from "components/Messages";
import SendMessage from "components/SendMessage";
import styled from "styled-components";
import { RoomContext } from "../context/RoomContext";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase-config";

const RoomHeader = styled.div`
    background-color: #fdfdfd;
    border-bottom: 3px solid #eee;
    padding: 1.5rem 0;
    text-align: center;
`;

export default function ChatWindow() {
    const { room } = useContext(RoomContext);
    const [members, setMembers] = useState([]);

    const getMembers = () => {
        const members = ref(db, `rooms/${room.name}/members`);
        onValue(members, (snapshot) => {
            const data = snapshot.val();
            let members = [];
            for (let i in data) {
                members.push(data[i]);
            }
            setMembers(members);
        });
    };

    useEffect(() => {
        if (room) {
            getMembers();
        }
    }, [room]);
    return (
        <>
            <RoomHeader>
                {room && (
                    <>
                        <h2>{room?.name}</h2>
                        <span>created by: {room?.creatorName}</span>
                        {members?.map((m) => (
                            <span>{m.name}</span>
                        ))}
                    </>
                )}
            </RoomHeader>
            <Messages />
            <SendMessage />
        </>
    );
}
