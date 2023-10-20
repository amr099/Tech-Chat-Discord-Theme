import React from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
    display: flex;
    align-items: start;
    gap: 10px;
    max-width: 90%;
    margin: 1rem;
    margin-left: auto;
`;

const Message = styled.div`
    background-color: var(--main);
    border-radius: 20px 20px 0px 20px;
    color: #fff;
    padding: 0.5rem 1rem;
`;

const Msg = styled.p`
    color:var(--light);
    font:var(--sm) main-semibold;
`;

const Time = styled.span`
    font-size: 0.5rem;
    float: right;
`;

export default function MyMessage({ msg, time }) {
    return (
        <MessageContainer key={time}>
            <Message>
                <Msg>{msg}</Msg>
                {/* <Time>{time}</Time> */}
            </Message>
        </MessageContainer>
    );
}
