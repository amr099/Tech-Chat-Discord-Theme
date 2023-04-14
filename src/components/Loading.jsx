import React from "react";
import styled from "styled-components";

export default function Loading() {
    const Spinning = styled.div`
        width: 10px;
        height: 10px;
        padding: 1rem;
        border: 3px solid blue;
        border-left: none;
        border-radius: 50%;
    `;
    return <Spinning></Spinning>;
}
