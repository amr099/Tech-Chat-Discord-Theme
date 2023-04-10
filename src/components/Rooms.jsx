import React, { useEffect, useState, useContext } from "react";
import { db, firestoreDb } from "../../firebase-config";
import { RoomContext } from "../context/RoomContext";
import { AuthContext } from "../context/AuthContext";
import { ref, child, push, update, onValue } from "firebase/database";
import styled from "styled-components";
import CreateRoom from "components/CreateRoom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
    arrayUnion,
    collection,
    updateDoc,
    doc,
    onSnapshot,
} from "firebase/firestore";
import { UsersContext } from "context/UsersContext";

const Container = styled.div`
    height: 93vh;
    overflow: auto;
    border-right: 3px solid #f4f4f4;
`;

const RoomContainer = styled.div`
    padding: 1rem;
    overflow: auto;
    border-bottom: 1px solid #5538ee;
    &:hover {
        background-color: #e7e7ff;
    }
`;

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
`;

const H3 = styled.h3`
    flex-shrink: 0;
    flex-basis: max-content;
`;

const P = styled.p`
    color: #c1c1c1;
    align-self: end;
`;

const Span = styled.span`
    font-size: 0.7rem;
    align-self: end;
    text-overflow: ellipsis;
`;

const Button = styled.button`
    color: #766fc3;
    font-weight: bold;
    border: 1px solid #766fc3;
    border-radius: 20px;
    padding: 5px 20px;
    align-self: start;

    &:hover {
        background-color: #6b4eff;
        color: #fff;
        cursor: pointer;
    }
`;

export default function Rooms() {
    const [joinedRooms, setJoinedRooms] = useState([]);
    const { setRoom } = useContext(RoomContext);
    const { userData } = useContext(AuthContext);
    const { users } = useContext(UsersContext);

    const [rooms, loading, error, onSnap] = useCollectionData(
        collection(firestoreDb, "Rooms")
    );

    useEffect(() => {
        if (userData) {
            for (let i in users) {
                if (users[i].id === userData.id) {
                    setJoinedRooms(users[i].rooms);
                }
            }
        }
    }, [userData]);

    const sendJoinRequest = (creatorId, roomName) => {
        if (userData) {
            try {
                const creatorDoc = doc(firestoreDb, "Users", creatorId);
                updateDoc(creatorDoc, {
                    notifications: arrayUnion({
                        userID: userData.id,
                        userName: userData.name,
                        userImg: userData.img,
                        roomName: roomName,
                        note: `${userData.name} wanna join your room: ${roomName}`,
                        time: new Date().toLocaleTimeString(),
                    }),
                });
            } catch {}
        } else {
            alert("You have to log in first.");
        }
    };

    const roomToPending = (room) => {
        try {
            const userDoc = doc(firestoreDb, "Users", userData.id);
            updateDoc(userDoc, {
                rooms: arrayUnion({ name: room, role: "pending" }),
                notifications: arrayUnion({
                    note: `You have sent request to join room: ${room}`,
                    time: new Date().toLocaleTimeString(),
                }),
            });
        } catch (e) {}
    };

    const join = (creatorId, room) => {
        sendJoinRequest(creatorId, room);
        roomToPending(room);
    };

    return (
        <>
            <Container>
                <CreateRoom rooms={rooms} />
                {rooms?.map((room) => {
                    return (
                        <RoomContainer
                            key={room.name}
                            onClick={() => setRoom(room)}
                        >
                            <Flex>
                                <Flex>
                                    <H3>{room.name}</H3>
                                    <Flex>
                                        <P>
                                            {room.lastMsg?.msg ||
                                                "No Messages Yet!"}
                                        </P>
                                        <Span>{room.lastMsg?.time}</Span>
                                    </Flex>
                                </Flex>
                                {!joinedRooms?.find(
                                    (r) => r.name === room.name
                                ) && (
                                    <Button
                                        onClick={() =>
                                            join(room.creatorId, room.name)
                                        }
                                    >
                                        Join
                                    </Button>
                                )}
                            </Flex>
                        </RoomContainer>
                    );
                })}
            </Container>
        </>
    );
}
