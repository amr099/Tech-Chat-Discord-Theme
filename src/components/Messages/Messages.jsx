import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";

import { AuthContext } from "src/context/AuthContext";
import Message from "src/components/Messages/Message";
import MyMessage from "src/components/Messages/MyMessage";
import { RoomContext } from "src/context/RoomContext";

const Container = styled.div`
    height: 65vh;
    padding: 1rem;
    overflow: auto;
    display: flex;
    gap: 5px;
    flex-direction: column;
    background-color: #fdfdfd;
`;

export default function Messages() {
    const { roomData } = useContext(RoomContext);
    const { userData } = useContext(AuthContext);
    const window = useRef();

    useEffect(() => {
        window.current.scrollTop = window.current.scrollHeight;
    }, [roomData.messages]);

    console.log(roomData.messages);

    return (
        <Container ref={window}>
            {roomData.messages.map((msg) => {
                if (msg.uid === userData?.id) {
                    return <MyMessage msg={msg.msg} time={msg.time} />;
                } else {
                    return (
                        <Message
                            uid={msg.uid}
                            msg={msg.msg}
                            time={msg.time}
                            owner={roomData.owner}
                        />
                    );
                }
            })}
        </Container>
    );
}
