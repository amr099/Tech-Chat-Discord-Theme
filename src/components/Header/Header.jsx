import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "src/context/AuthContext";
import Notifications from "./Notifications";
import LogIn from "./LogIn";

const HeaderContainer = styled.div`
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0 2.5%;
    background-color: var(--dark);
    color: #fff;
    border-bottom: 3px solid var(--main);
`;

const H1 = styled.h1`
    font: var(--lg) main-bold;
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
    const [notifications, setNotifications] = useState({
        icon: false,
        window: false,
    });

    const toggleNotifications = () => {
        setNotifications({
            icon: !notifications.icon,
            window: !notifications.window,
        });
    };

    return (
        <HeaderContainer>
            <H1>TechChat</H1>
            <Flex>
                {userData && (
                    <I
                        className={
                            notifications.icon
                                ? "bi bi-bell-fill"
                                : "bi bi-bell"
                        }
                        onClick={toggleNotifications}
                    ></I>
                )}
                {notifications.window && <Notifications />}
                <LogIn />
            </Flex>
        </HeaderContainer>
    );
}
