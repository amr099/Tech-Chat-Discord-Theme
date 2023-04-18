import React, { useEffect, useState, useContext } from "react";
import { firestoreDb } from "../../firebase-config";
import { RoomContext } from "../context/RoomContext";
import { AuthContext } from "../context/AuthContext";
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
import { SnackContext } from "context/SnackContext";
import Loading from "./Loading";

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
    color: #aaa;
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
    const { selectRoom } = useContext(RoomContext);
    const { userData } = useContext(AuthContext);
    const users = useContext(UsersContext);
    const { showSnack } = useContext(SnackContext);
    const [joinedRooms, setJoinedRooms] = useState([]);
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
        } else {
            setJoinedRooms([]);
        }
    }, [userData]);

    const sendJoinRequest = (creatorId, roomName) => {
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
            showSnack(
                `Your request to join room: ${roomName} has been sent successfully!`,
                "success"
            );
        } catch (e) {
            console.log(e);
            showSnack("You have to login first!", "error");
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
        } catch (e) {
            console.log(e);
            showSnack("You have to login first!", "error");
        }
    };

    const join = (creatorId, room) => {
        if (userData) {
            try {
                sendJoinRequest(creatorId, room);
                roomToPending(room);
                showSnack(
                    `Your request to join room: ${roomName} has been sent successfully!`,
                    "success"
                );
            } catch (e) {
                console.log(e);
                showSnack("Error!", "error");
            }
        } else {
            showSnack("You have to login first!", "error");
        }
    };

    return (
        <>
            <Container>
                <CreateRoom rooms={rooms} />
                {rooms?.map((room) => {
                    return (
                        <RoomContainer
                            key={room.name}
                            onClick={() => selectRoom(room.name)}
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
