import React, { useContext } from "react";
import { RoomContext } from "../context/RoomContext";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { UsersContext } from "./../context/UsersContext";

const Container = styled.div`
    height: 65vh;
    padding: 1rem;
    overflow: auto;
    display: flex;
    gap: 5px;
    flex-direction: column;
    background-color: #fdfdfd;
`;

const MessageContainer = styled.div`
    display: flex;
    align-items: start;
    gap: 10px;
    max-width: 90%;
    margin: 1rem;
`;
const MyMessageContainer = styled(MessageContainer)`
    margin-left: auto;
`;

const Message = styled.div`
    padding: 1rem;
    background-color: #e3e5e5;
    border-radius: 0px 20px 20px 20px;
`;
const MyMessage = styled.div`
    background-color: #5538ee;
    border-radius: 20px 20px 0px 20px;
    color: #fff;
    padding: 0.5rem 1rem;
`;

const Name = styled.p`
    font-size: 1rem;
    margin: 0;
    margin-bottom: 10px;
    font-weight: bold;
`;

const Msg = styled.p`
    font-weight: bold;
    margin: 0.5rem 0;
`;

const I = styled.i`
    margin: 0 5px;
    &:hover {
        color: orange;
        cursor: inherit;
    }
`;

const Time = styled.span`
    font-size: 0.5rem;
    float: right;
`;

const UserImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

export default function Messages() {
    const { owner, messages } = useContext(RoomContext);
    const { userData } = useContext(AuthContext);
    const { users } = useContext(UsersContext);

    return (
        <Container>
            {messages &&
                messages?.map((msg) => {
                    if (msg.uid === userData?.id) {
                        return (
                            <MyMessageContainer key={msg.time}>
                                <MyMessage>
                                    <Msg>{msg.msg}</Msg>
                                    <Time>{msg.time}</Time>
                                </MyMessage>
                            </MyMessageContainer>
                        );
                    } else {
                        return (
                            <MessageContainer key={msg.time}>
                                <UserImg
                                    src={(() => {
                                        for (var i in users) {
                                            if (users[i].id === msg.uid) {
                                                return users[i].img;
                                            }
                                        }
                                    })()}
                                ></UserImg>

                                <div>
                                    <Name>
                                        {(() => {
                                            for (var i in users) {
                                                if (users[i].id === msg.uid) {
                                                    return users[i].name;
                                                }
                                            }
                                        })()}
                                        {msg.uid === owner && (
                                            <I className='bi bi-star-fill'></I>
                                        )}
                                    </Name>
                                    <Message>
                                        <Msg>{msg.msg}</Msg>
                                        <Time>{msg.time}</Time>
                                    </Message>
                                </div>
                            </MessageContainer>
                        );
                    }
                })}
        </Container>
    );
}
