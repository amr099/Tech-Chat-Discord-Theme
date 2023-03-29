import React, { useEffect, useState, useContext } from "react";
import { db } from "../../firebase-config";
import { RoomContext } from "../context/RoomContext";
import { AuthContext } from "../context/AuthContext";
import { ref, child, push, update, onValue } from "firebase/database";
import styled from "styled-components";
import CreateRoom from "components/CreateRoom";

const Container = styled.div`
    background-color: #f9f9f9;
    height: 90vh;
    overflow: auto;
    border-right: 3px solid #f6f6f6;
`;

const RoomContainer = styled.div`
    padding: 1rem;
    border-bottom: 2px solid #eee;
    &:hover {
        background-color: #f2faf1;
        border-top: 3px solid #c7f2ae;
    }
`;

const Img = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
`;

const P = styled.p`
    color: #c1c1c1;
`;

const Span = styled.span`
    color: #c1c1c1;
`;

const Button = styled.span`
    all: unset;
    font-size: 0.8rem;
    padding: 1rem;
    background-color: #000;
    color: #b7b8bb;
    font-weight: bold;

    &:hover {
        cursor: pointer;
    }
`;

export default function Rooms() {
    const { setRoom } = useContext(RoomContext);
    const { user } = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);
    const [joinedRooms, setJoinedRooms] = useState([]);

    const sendJoinRequest = (creatorId, roomName, roomId) => {
        if (user.displayName) {
            try {
                const newNotificationKey = push(
                    child(ref(db), `users/${creatorId}`)
                ).key;

                const joinRequest = {
                    userName: user?.displayName,
                    userID: user?.uid,
                    userImg: user?.photoURL,
                    roomName: roomName,
                    roomId: roomId,
                    note: `${user.displayName} wanna join ${roomName}`,
                };

                const updates = {};
                updates[
                    `users/${creatorId}/notifications/${newNotificationKey}/`
                ] = joinRequest;

                return update(ref(db), updates);
            } catch (e) {
                console.log(e);
                console.log("error sending request to join", room);
            }
        } else {
            alert("You have to log in first.");
        }
    };

    const roomToPending = (roomName, roomId) => {
        const newRoomKey = push(child(ref(db), `users/${user.uid}/rooms`)).key;
        const updates = {};
        updates[`users/${user.uid}/rooms/${roomId}`] = {
            id: roomId,
            name: roomName,
            status: "pending",
        };
        return update(ref(db), updates);
    };

    const join = (creatorId, room, id) => {
        sendJoinRequest(creatorId, room, id);
        roomToPending(room, id);
    };

    const getRooms = () => {
        const rooms = ref(db, "rooms/");
        onValue(rooms, (snapshot) => {
            const data = snapshot.val();
            let rooms = [];
            for (let i in data) {
                rooms.push(data[i]);
            }
            setRooms(rooms);
        });
    };
    useEffect(() => {
        getRooms();
    }, []);

    const getJoinedRooms = () => {
        const joinedRooms = ref(db, `users/${user.uid}/rooms`);
        onValue(joinedRooms, (snapshot) => {
            const data = snapshot.val();
            let rooms = [];
            for (let i in data) {
                console.log(data[i]);
                rooms.push(data[i]);
            }
            setJoinedRooms(rooms);
        });
    };

    useEffect(() => {
        getJoinedRooms();
    }, [user?.displayName, rooms]);

    return (
        <>
            <Container>
                {user.displayName && (
                    <>
                        <CreateRoom rooms={rooms} />
                        <h1>Joined Rooms</h1>
                        {joinedRooms?.map((room) => (
                            <RoomContainer onClick={() => setRoom(room)}>
                                <Flex>
                                    <Flex>
                                        <Img src='https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='></Img>
                                        <h4>{room.name}</h4>
                                        <span>{room.status}</span>
                                    </Flex>
                                    <P>{room?.lastMsg}</P>
                                </Flex>
                            </RoomContainer>
                        ))}
                    </>
                )}
                <hr></hr>
                <h2>Another Rooms</h2>
                {rooms.map((room) => {
                    if (!joinedRooms.find((r) => r.name === room.name)) {
                        return (
                            <RoomContainer onClick={() => setRoom(room)}>
                                <Flex>
                                    <Flex>
                                        <Img src='https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='></Img>
                                        <h4>{room.name}</h4>
                                        <span>{room.status}</span>
                                    </Flex>
                                    <P>{room?.lastMsg}</P>
                                    <Button
                                        onClick={() =>
                                            join(
                                                room.creatorId,
                                                room.name,
                                                room.id
                                            )
                                        }
                                    >
                                        Join
                                    </Button>
                                </Flex>
                            </RoomContainer>
                        );
                    }
                })}
            </Container>
        </>
    );
}
