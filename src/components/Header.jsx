import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import Notifications from "./Notifications";
import User from "components/User";

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 7vh;
    padding: 0 2.5%;
    background-color: #292929;
    color: #fff;
`;

const H1 = styled.h1`
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    letter-spacing: -1px;
`;

const Flex = styled.div`
    display: flex;
    gap: 2rem;
    align-items: center;
`;

const I = styled.i`
    font-size: 1.2rem;
`;

export default function Header() {
    const { userData } = useContext(AuthContext);
    const [notifications, showNotifications] = useState(false);
    const [bell, setBell] = useState(false);

    return (
        <HeaderContainer>
            <H1>TechChat</H1>
            <Flex>
                {userData && (
                    <I
                        className={bell ? "bi bi-bell-fill" : "bi bi-bell"}
                        onClick={() => {
                            showNotifications(!notifications);
                            setBell(!bell);
                        }}
                    ></I>
                )}
                {notifications && <Notifications />}
                <User />
            </Flex>
        </HeaderContainer>
    );
}
