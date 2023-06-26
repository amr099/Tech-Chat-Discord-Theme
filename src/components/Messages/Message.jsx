import React, { useContext } from "react";
import styled from "styled-components";

import { UsersContext } from "src/context/UsersContext";
import { RoomContext } from "src/context/RoomContext";

const MessageContainer = styled.div`
    display: flex;
    align-items: start;
    gap: 10px;
    max-width: 90%;
    margin: 1rem;
`;

const MessageTheme = styled.div`
    padding: 1rem;
    background-color: #e3e5e5;
    border-radius: 0px 20px 20px 20px;
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

export default function Message({ uid, msg, time, owner }) {
    const users = useContext(UsersContext);

    return (
        <MessageContainer key={time}>
            <UserImg
                src={(() => {
                    for (var i in users) {
                        if (users[i].id === uid) {
                            return users[i].img;
                        }
                    }
                })()}
            ></UserImg>

            <div>
                <Name>
                    {(() => {
                        for (var i in users) {
                            if (users[i].id === uid) {
                                return users[i].name;
                            }
                        }
                    })()}
                    {uid === owner && <I className='bi bi-star-fill'></I>}
                </Name>
                <MessageTheme>
                    <Msg>{msg}</Msg>
                    <Time>{time}</Time>
                </MessageTheme>
            </div>
        </MessageContainer>
    );
}
