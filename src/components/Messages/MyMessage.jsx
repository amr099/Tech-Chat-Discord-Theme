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
    color: var(--light);
    font: var(--sm) main-semibold;
`;

const Img = styled.img`
    width: 100%;
`;

const Caption = styled(Message)``;

const Time = styled.span`
    font-size: 0.5rem;
    float: right;
`;

export default function MyMessage({ msg, time, img }) {
    return (
        <MessageContainer key={time}>
            {img ? (
                <figure>
                    <Img src={img} />
                    <Caption>
                        <Msg>{msg}</Msg>
                    </Caption>
                </figure>
            ) : (
                <Message>
                    <Msg>{msg}</Msg>
                </Message>
            )}
        </MessageContainer>
    );
}
