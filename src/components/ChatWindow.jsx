import React, { useContext } from "react";
import Messages from "components/Messages";
import SendMessage from "components/SendMessage";
import styled from "styled-components";
import { RoomContext } from "../context/RoomContext";

const Header = styled.div`
    height: 9vh;
    background-color: #fdfdfd;
    border-bottom: 3px solid #f4f4f4;
    text-align: center;
    padding: 10px 0;
`;

const I = styled.i`
    position: relative;
    left: 47%;
    font-size: 2rem;
    &:hover {
        color: #ddd;
    }
`;

const H2 = styled.h2`
    margin: 0;
`;

export default function ChatWindow({ membersCon, setMembersCon }) {
    const { room } = useContext(RoomContext);
    return (
        room && (
            <>
                <Header>
                    <H2>{room?.name}</H2>
                    <I
                        className='bi bi-people-fill'
                        onClick={() => {
                            setMembersCon(!membersCon);
                        }}
                    ></I>
                </Header>
                <Messages />
                <SendMessage />
            </>
        )
    );
}
