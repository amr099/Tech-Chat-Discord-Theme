import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import Login from "components/Login";
import Notifications from "./Notifications";

export const HeaderBackground = styled.div`
    background-color: #292929;
    color: #b7b8bb;
`;
export const Container = styled.div`
    width: 95%;
    margin: auto;
`;
const Flex = styled.div`
    width: ${(props) => props.width};
    display: flex;
    justify-content: ${(props) => props.justfiy};
    align-items: ${(props) => props.align};
    flex-direction: ${(props) => props.direction};
`;

const H1 = styled.h1`
    font-weight: 400;
    letter-spacing: -2px;
`;

export default function Header() {
    const { user } = useContext(AuthContext);
    const [notifications, showNotifications] = useState(false);

    return (
        <HeaderBackground>
            <Container>
                <Flex justfiy={"space-between"}>
                    <H1>Tech Chat</H1>
                    <Flex align={"center"}>
                        <i
                            className='bi bi-bell'
                            onClick={() => showNotifications(!notifications)}
                        ></i>
                        {notifications && <Notifications />}
                        <Login />
                    </Flex>
                </Flex>
            </Container>
        </HeaderBackground>
    );
}
