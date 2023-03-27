import React, { useEffect, useState, useContext } from "react";
import { db } from "../firebase-config";
import { RoomContext } from "./RoomContext";
import { AuthContext } from "AuthContext";
import { ref, child, push, update, onValue } from "firebase/database";
import styled from "styled-components";
import CreateRoom from "CreateRoom";

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

const Ul = styled.ul`
    all: unset;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Li = styled.li`
    all: unset;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    font-size: 1.5rem;
    border-bottom: 1px solid #ccc;
    cursor: pointer;

    &:hover {
        background-color: lightblue;
    }
`;

const Span = styled.span`
    flex-grow: -1;
    margin-right: 1rem;
    color: #c1c1c1;
`;

const Button = styled.span`
    all: unset;
    font-size: 0.8rem;
    padding: 1rem;
    border-radius: 10px 10px;
    background-color: #000;
    color: #b7b8bb;
    font-weight: bold;
`;

export default function Rooms() {
    const { room, setRoom } = useContext(RoomContext);
    const { user } = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);

    const join = (creatorId, room) => {
        try {
            const newNotificationKey = push(
                child(ref(db), `users/${creatorId}`)
            ).key;

            const joinRequest = {
                id: newNotificationKey,
                userName: user?.displayName,
                userID: user?.uid,
                room: room,
            };

            const updates = {};
            updates[`users/${creatorId}/notifications/${newNotificationKey}/`] =
                joinRequest;

            return update(ref(db), updates);
        } catch (e) {
            console.log(e);
            console.log("error sending request to join", room);
        }
    };

    useEffect(() => {
        const starCountRef = ref(db, "rooms/");
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            let rooms = [];
            for (let i in data) {
                rooms.push(data[i]);
            }
            setRooms(rooms);
        });
    }, []);

    return (
        <>
            <Container>
                <CreateRoom />
                <RoomContainer>
                    <Flex>
                        <div>
                            <Flex>
                                <Flex>
                                    <Img src='https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='></Img>
                                    <h4>Capmpaings Data</h4>
                                </Flex>
                                <Span>20min</Span>
                                <Button>Join</Button>
                            </Flex>
                            <P>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Modi iste ratione deleniti
                                placeat porro numquam beatae, voluptatem sunt
                                voluptatum voluptates, autem, perferendis
                                corporis cupiditate! Eaque facere explicabo
                                repellat quod animi.
                            </P>
                        </div>
                    </Flex>
                </RoomContainer>
                <RoomContainer>
                    <Flex>
                        <div>
                            <Flex>
                                <Flex>
                                    <Img src='https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='></Img>
                                    <h4>Capmpaings Data</h4>
                                </Flex>
                                <Span>20min</Span>
                                <Button>Join</Button>
                            </Flex>
                            <P>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Modi iste ratione deleniti
                                placeat porro numquam beatae, voluptatem sunt
                                voluptatum voluptates, autem, perferendis
                                corporis cupiditate! Eaque facere explicabo
                                repellat quod animi.
                            </P>
                        </div>
                    </Flex>
                </RoomContainer>
                <RoomContainer>
                    <Flex>
                        <div>
                            <Flex>
                                <Flex>
                                    <Img src='https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='></Img>
                                    <h4>Capmpaings Data</h4>
                                </Flex>
                                <Span>20min</Span>
                                <Button>Join</Button>
                            </Flex>
                            <P>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Modi iste ratione deleniti
                                placeat porro numquam beatae, voluptatem sunt
                                voluptatum voluptates, autem, perferendis
                                corporis cupiditate! Eaque facere explicabo
                                repellat quod animi.
                            </P>
                        </div>
                    </Flex>
                </RoomContainer>
            </Container>
        </>
    );
}
