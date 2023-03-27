import { ref, onValue } from "firebase/database";
import { db } from "../firebase-config";

import React, { useState, useContext, useEffect } from "react";
import { RoomContext } from "./RoomContext";
import styled from "styled-components";
const Container = styled.div`
    height: 70vh;
    overflow: auto;
    display: flex;
    flex-direction: column;
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

    useEffect(() => {
        console.log(room);
        const messages = ref(db, `messages/${room}/`);
        onValue(messages, (snapshot) => {
            const data = snapshot.val();
            let messages = [];
            for (let i in data) {
                messages.push(data[i]);
            }
            setMessages(messages);
        });
    }, [room]);

    return (
        <Container>
            {messages &&
                messages?.map((msg) => (
                    <MyMessageContainer>
                        {/* <UserImg src='https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='></UserImg> */}
                        <Message>
                            <Msg>{msg.msg}</Msg>
                            <Time>{msg?.time}</Time>
                        </Message>
                    </MyMessageContainer>
                ))}
        </Container>
    );
}
