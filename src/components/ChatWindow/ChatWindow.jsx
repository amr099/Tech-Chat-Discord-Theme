import React, { lazy, useContext, Suspense } from "react";
import styled from "styled-components";

import { RoomContext } from "src/context/RoomContext";
import Loading from "src/components/Loading";
import MembersIcon from "src/components/Members/MembersIcon";
import SendMessage from "src/components/ChatWindow/SendMessage";
import Messages from "src/components/Messages/Messages";

const Header = styled.div`
    height: 9vh;
    background-color: #fdfdfd;
    border-bottom: 3px solid #f4f4f4;
    text-align: center;
    padding: 10px 0;
`;

export default function ChatWindow({ membersWindow, toggleMembersWindow }) {
    const { roomData } = useContext(RoomContext);

    return (
        roomData?.name && (
            <>
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
            </>
        )
    );
}
