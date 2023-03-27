import Messages from "Messages";
import React, { useContext } from "react";
import SendMessage from "SendMessage";
import styled from "styled-components";
import { RoomContext } from "RoomContext";

const RoomHeader = styled.div`
    background-color: #fdfdfd;
    border-bottom: 3px solid #eee;
    padding: 1.5rem 0;
    text-align: center;
`;

export default function ChatWindow() {
    const { room } = useContext(RoomContext);
    return (
        <>
            <RoomHeader>
                <h2>{room}</h2>
            </RoomHeader>
            <Messages />
            <SendMessage />
        </>
    );
}
