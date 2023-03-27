import { ref, onValue } from "firebase/database";
import { db } from "../firebase-config";

import React, { useState, useContext, useEffect } from "react";
import { RoomContext } from "./RoomContext";
import styled from "styled-components";
const Container = styled.div`
    height: 70vh;
    overflow: auto;
    display: grid;
`;

const MessageContainer = styled.div`
    margin: 2rem 0;
    display: flex;
    gap: 10px;
`;
const MyMessageContainer = styled(MessageContainer)`
    justify-self: end;
`;

const Message = styled.div`
    padding: 1rem;
    background-color: #f1ffef;
    border-radius: 10px;
`;
const MyMessage = styled(Message)`
    background-color: #f1f5fb;
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
        const messages = ref(db, `messages/${room}/`);
        onValue(messages, (snapshot) => {
            let messages = [];
            const data = snapshot.val();
            for (let i in data) {
                messages.push(data[i]);
            }
            setMessages(messages);
        });
    }, [room]);

    return (
        // <ul>
        //     {messages?.map((m) => (
        //         <li>
        //             {m.sender}:{m.msg}
        //         </li>
        //     ))}
        // </ul>
        <Container>
            <MessageContainer>
                <UserImg src='https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='></UserImg>
                <Message>
                    <Msg>
                        Hi Den, Not yet. Iam working on the task right now!
                    </Msg>
                    <Time>11:34 AM</Time>
                </Message>
            </MessageContainer>
            <MessageContainer>
                <UserImg src='https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='></UserImg>
                <Message>
                    <Msg>
                        Hi Den, Not yet. Iam working on the task right now!
                    </Msg>
                    <Time>11:34 AM</Time>
                </Message>
            </MessageContainer>
            <MessageContainer>
                <UserImg src='https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='></UserImg>
                <Message>
                    <Msg>
                        Hi Den, Not yet. Iam working on the task right now!
                    </Msg>
                    <Time>11:34 AM</Time>
                </Message>
            </MessageContainer>
            <MyMessageContainer>
                <MyMessage>
                    <Msg>
                        Hi Den, Not yet. Iam working on the task right now!
                    </Msg>
                    <Time>11:34 AM</Time>
                </MyMessage>
            </MyMessageContainer>
        </Container>
    );
}
