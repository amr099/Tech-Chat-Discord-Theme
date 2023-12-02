import React from "react";
import styled from "styled-components";

const Spinner = styled.div`
    margin:3rem auto;
    width: 20px;
    height: 20px;
    animation: scale ease 1.4s infinite;

    &:before {
        content: "";
        position: absolute;
        width: 15px;
        height: 15px;
        background: #7289da;
        top: -10px;
        left: -10px;
        animation: top ease 3s infinite;
    }

    &:after {
        content: "";
        position: absolute;
        width: 15px;
        height: 15px;
        background: #7289da;
        bottom: -10px;
        right: -10px;
        animation: bottom ease 3s infinite;
    }

    @keyframes top {
        0% {
            top: -10px;
        }
        20% {
            top: 100%;
            left: -10px;
        }
        40% {
            left: 100%;
            top: 100%;
            transform: rotate(180deg);
        }
        60% {
            top: -10px;
            left: 100%;
        }
        80% {
            top: -10px;
            transform: rotate(360deg);
        }
        100% {
            left: -10px;
        }
    }

    @keyframes bottom {
        0% {
            bottom: -10px;
        }
        20% {
            bottom: 100%;
            right: -10px;
        }
        40% {
            right: 100%;
            bottom: 100%;
            transform: rotate(180deg);
        }
        60% {
            bottom: -10px;
            right: 100%;
        }
        80% {
            bottom: -10px;
            transform: rotate(360deg);
        }
        100% {
            right: -10px;
        }
    }

    @keyframes scale {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.7);
        }
        100% {
            transform: scale(1);
        }
`;

function Loading() {
    return <Spinner></Spinner>;
}

export default Loading;
