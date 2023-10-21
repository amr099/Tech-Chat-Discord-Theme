import React, { lazy, useContext, Suspense } from "react";
import styled from "styled-components";
import { RoomContext } from "src/context/RoomContext";
import Loading from "src/components/Loading";
import MembersIcon from "src/components/Members/MembersIcon";
import SendMessage from "src/components/ChatWindow/SendMessage";
import Messages from "src/components/Messages/Messages";

const Header = styled.div`
    background-color: var(--dark);
    color:#fff;
    border-bottom: 3px solid var(--main);
    text-align: center;
    padding: 10px 0;
    font:var(--md) main;
`;
const WindowContainer = styled.div`
    height:100%;
    display:flex;
    flex-direction:column;
`;

export default function ChatWindow({ membersWindow, toggleMembersWindow }) {
    const { roomData } = useContext(RoomContext);

    return (
        roomData?.name && (
            <WindowContainer>
                <Header>
                    <h2>{roomData.name}</h2>
                    <MembersIcon
                        membersWindow={membersWindow}
                        toggleMembersWindow={toggleMembersWindow}
                    />
                </Header>
                <Suspense fallback={<Loading />}>
                    <Messages />
                </Suspense>
                <SendMessage />
            </WindowContainer>
        )
    );
}
