import React from "react";
import styled from "styled-components";

const Spinner = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 1rem auto;
    border: 10px solid #fff;
    border-top: 10px solid #00f;
    border-bottom: 10px solid #00f;
    animation: loading 1s linear 0s infinite;

    @keyframes loading {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

function Loading() {
    return <Spinner></Spinner>;
}

export default Loading;
