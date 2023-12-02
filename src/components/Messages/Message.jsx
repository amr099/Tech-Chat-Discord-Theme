import React, { useContext } from "react";
import styled from "styled-components";
import { UsersContext } from "src/context/UsersContext";
import star from "../../assets/Gold Medal.svg";
const MessageContainer = styled.div`
    display: flex;
    align-items: start;
    gap: 10px;
    max-width: 90%;
    margin: 0.5rem;
    @media (max-width: 769px) {
        margin: 5px;
    }
`;

const Name = styled.span`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    color: #fff;
    font: var(--sm) main-bold;
    margin: 0;
    margin-bottom: 10px;
    font-weight: bold;
`;

const Msg = styled.p`
    color: var(--light);
    font: var(--sm) main-semibold;
    margin: 0.5rem 0;
`;

const I = styled.i`
    margin: 0 5px;
    &:hover {
        color: orange;
        cursor: inherit;
    }
`;

const Img = styled.img`
    width: 100%;
`;

const Time = styled.span`
    font-size: 0.5rem;
    float: right;
`;

const UserImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    @media (max-width: 769px) {
        width: 25px;
        height: 25px;
    }
`;

export default function Message({ uid, msg, time, owner, img }) {
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
                    {uid === owner && <img src={star} width='20' />}
                </Name>
                {/* <Time>{time}</Time> */}
                {img ? (
                    <figure>
                        <Img src={img} />
                        <figcaption>
                            <Msg>{msg}</Msg>
                        </figcaption>
                    </figure>
                ) : (
                    <Msg>{msg}</Msg>
                )}
            </div>
        </MessageContainer>
    );
}
