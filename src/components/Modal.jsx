import React, { useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    left: 80%;
    top: 20%;
    border-radius: 20px;
    max-height: 90vh;
    overflow: auto;
`;

const Button = styled.button`
    color: #766fc3;
    border: 1px solid #766fc3;
    border-radius: 20px 20px;
    padding: 5px 20px;
    min-width: 80px;
    max-width: 200px;
    display: flex;
    gap: 5px;
    align-items: center;

    &:hover {
        background-color: #6b4eff;
        color: #fff;
        border-radius: 20px 20px;
        cursor: pointer;
    }
`;

export default function Modal({ children }) {
    const [modal, setModal] = useState(false);
    const show = () => {
        setModal(true);
    };
    <Button onClick={show}>
        <i className='bi bi-person-circle'></i> Sign In
    </Button>;
    return createPortal(
        <Container>{modal && <div>{children}</div>}</Container>,
        document.getElementById("root")
    );
}
