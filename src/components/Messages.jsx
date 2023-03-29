import { ref, onValue } from "firebase/database";
import { db } from "../../firebase-config";

import React, { useState, useContext, useEffect } from "react";
import { RoomContext } from "../context/RoomContext";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
const Container = styled.div`
    height: 70vh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    background-color: #fdfdfd;
`;

const MessageContainer = styled.div`
    display: flex;
    gap: 10px;
    max-width: 45%;
    margin: 2rem 0;
`;
const MyMessageContainer = styled(MessageContainer)`
    margin-left: auto;
`;

const Message = styled.div`
    padding: 1rem;
    background-color: #f1ffef;
    border-radius: 10px;
`;
const MyMessage = styled(Message)`
    background-color: #f1f5fb;
    float: right;
`;

const Msg = styled.p`
    font-size: 1rem;
    font-weight: bold;
`;

const Time = styled.span`
    font-size: 0.8rem;
    color: #ddd;
    float: right;
`;

const UserImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

export default function Messages() {
    const [messages, setMessages] = useState();
    const { room } = useContext(RoomContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (room) {
            const messages = ref(db, `messages/${room.name}/`);
            onValue(messages, (snapshot) => {
                const data = snapshot.val();
                let messages = [];
                for (let i in data) {
                    messages.push(data[i]);
                }
                setMessages(
                    messages.sort((a, b) => {
                        const date1 = new Date(a.time);
                        const date2 = new Date(b.time);
                        return date1 - date2;
                    })
                );
            });
        }
    }, [room]);

    return (
        <Container>
            {messages &&
                messages?.map((msg) => {
                    if (msg.uid === user.uid) {
                        return (
                            <MyMessageContainer>
                                <Message>
                                    <Msg>{msg.msg}</Msg>
                                    <Time>{msg.time}</Time>
                                </Message>
                            </MyMessageContainer>
                        );
                    } else {
                        return (
                            <MessageContainer>
                                <UserImg
                                    src={
                                        msg.userImg ||
                                        "https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-login-interface-abstract-blue-icon-png-image_3917504.jpg"
                                    }
                                ></UserImg>
                                <Message>
                                    <Msg>{msg.msg}</Msg>
                                    <Time>{msg.time}</Time>
                                </Message>
                            </MessageContainer>
                        );
                    }
                })}
        </Container>
    );
}
