import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    position: fixed;
    margin-top: 82vh;
    margin-left: 1vw;
    padding: 0.5rem 1rem;
    width: 20rem;
    height: 50px;
    background-color: #000;
    color: #000;
    border-radius: 10px;
`;

const I = styled.i`
    float: right;
    font-size: 1.5rem;

    &:hover {
        color: #aaa;
    }
`;

export default function Snackbar({ type, message, onClose }) {
    return (
        <Container>
            <I className='bi bi-x' onClick={onClose}></I>
            <p>Here is a snack</p>
        </Container>
    );
}
