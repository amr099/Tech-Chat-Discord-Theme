import Messages from "Messages";
import React from "react";
import SendMessage from "SendMessage";
import styled from "styled-components";
const RoomHeader = styled.div`
    background-color: #fdfdfd;
    border-bottom: 3px solid #eee;
    padding: 1.5rem 0;
    text-align: center;
    width: 100%;
`;

export default function ChatWindow() {
    return (
        <>
            <RoomHeader>
                <h2>Room Name</h2>
            </RoomHeader>
            <Messages />
            <SendMessage />
        </>
    );
}
