import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { AuthContext } from "src/context/AuthContext";
import Message from "src/components/Messages/Message";
import MyMessage from "src/components/Messages/MyMessage";
import { RoomContext } from "src/context/RoomContext";
import Loading from "./../Loading";

const Container = styled.div`
    height: 100%;
    padding: 1rem;
    overflow: auto;
    display: flex;
    gap: 5px;
    flex-direction: column;
    background-color: var(--dark);
`;

export default function Messages() {
    const { roomData } = useContext(RoomContext);
    const { userData } = useContext(AuthContext);
    const window = useRef();

    useEffect(() => {
        window.current.scrollTop = window.current.scrollHeight;
    }, [roomData.messages]);

    return (
        <Container ref={window}>
            {roomData ? (
                roomData.messages?.map((msg) => {
                    if (msg.uid === userData?.id) {
                        return (
                            <MyMessage
                                msg={msg.msg}
                                time={msg.time}
                                img={msg.img}
                            />
                        );
                    } else {
                        return (
                            <Message
                                uid={msg.uid}
                                msg={msg.msg}
                                time={msg.time}
                                owner={roomData.owner}
                                img={msg.img}
                            />
                        );
                    }
                })
            ) : (
                <Loading />
            )}
        </Container>
    );
}
