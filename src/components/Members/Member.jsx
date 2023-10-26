import React from "react";
import styled from "styled-components";

const Flex = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: ${(props) => props.justify};
`;

const Span = styled.span`
    white-space: nowrap;
    font-weight: bold;
    color:${(props) =>
        props.status === "online" ? "var(--light)" : "var(--semi-dark)"};;
`;

// const Status = styled.div`
//     width: 10px;
//     height: 10px;
//     border-radius: 50%;
//     background-color: ${(props) =>
//         props.status === "online" ? "green" : "red"};
// `;

const Img = styled.img`
    display: ${(props)=> props.status === 'online' ? 'inline-flex' : 'none'};
    width: 30px;
    height: 30px;
    border-radius: 50%;
`;
export default function Member({ img, name, status, email }) {
    return (
        <Flex justify={"space-between"} key={email}>
            <Flex>
                <Img src={img} status={status}></Img>
                <Span status={status}>{name}</Span>
                {/* <Status status={status}></Status> */}
            </Flex>
        </Flex>
    );
}
