import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import Notifications from "./Notifications";
import User from "components/User";

export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: 1rem;
    height: 50px;
    background-color: #292929;
    color: #fff;
`;

const Container = styled.div`
    width: 95%;
    margin: auto;
`;

const H1 = styled.h1`
    font-size: 1.2rem;
    font-weight: 400;
    letter-spacing: -1px;
`;

const Flex = styled.div`
    width: ${(props) => props.width};
    display: flex;
    gap: 20px;
    justify-content: ${(props) => props.justfiy};
    align-items: ${(props) => props.align};
    flex-direction: ${(props) => props.direction};
`;

export default function Header() {
    const { userData } = useContext(AuthContext);
    const [notifications, showNotifications] = useState(false);
    const [bell, setBell] = useState(false);

    return (
        <HeaderContainer>
            <Container>
                <Flex justfiy={"space-between"}>
                    <H1>TechChat</H1>
                    <Flex align={"center"}>
                        {userData && (
                            <i
                                className={
                                    bell ? "bi bi-bell-fill" : "bi bi-bell"
                                }
                                onClick={() => {
                                    showNotifications(!notifications);
                                    setBell(!bell);
                                }}
                            ></i>
                        )}
                        {notifications && <Notifications />}
                        <User />
                    </Flex>
                </Flex>
            </Container>
        </HeaderContainer>
    );
}
