import { SnackContext } from "context/SnackContext";
import React, { useContext, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 82vh;
    margin-left: 1vw;
    padding: 0.5rem 1rem;
    width: 20rem;
    height: 50px;
    background-color: ${(props) =>
        props.type === "success" ? "#0f0" : "#000"};
    color: #fff;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: bold;
`;

const I = styled.i`
    float: right;
    font-size: 1.5rem;

    &:hover {
        color: #aaa;
    }
`;

export default function Snackbar() {
    const { setShow, content, type } = useContext(SnackContext);
    return (
        <Container type={type}>
            <p>{content}</p>
            <I
                className='bi bi-x'
                onClick={() => {
                    setShow(false);
                }}
            ></I>
        </Container>
    );
}
