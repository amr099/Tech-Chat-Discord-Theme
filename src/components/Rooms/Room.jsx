import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "src/context/AuthContext";
import { RoomContext } from "src/context/RoomContext";
import { UsersContext } from "src/context/UsersContext";
import JoinRoom from "./JoinRoom";

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

export default function Room({ name, lastMsg, lastMsgTime, creatorId }) {
    const { selectRoom } = useContext(RoomContext);
    const [joinedRooms, setJoinedRooms] = useState([]);
    const users = useContext(UsersContext);
    const { userData } = useContext(AuthContext);

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

    return (
        <RoomContainer
            onClick={() => {
                selectRoom(name);
            }}
        >
            <Flex>
                <Flex>
                    <H3>{name}</H3>
                    <Flex>
                        <P>{lastMsg || "No Messages Yet!"}</P>
                        <Span>{lastMsgTime}</Span>
                    </Flex>
                </Flex>
                {!joinedRooms?.find((r) => r.name === name) && (
                    <JoinRoom name={name} creatorId={creatorId} />
                )}
            </Flex>
        </RoomContainer>
    );
}
