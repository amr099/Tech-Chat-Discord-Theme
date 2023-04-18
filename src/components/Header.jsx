import React, { Suspense, lazy, useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";
const User = lazy(() => import("components/User"));
const Notifications = lazy(() => import("components/Notifications"));

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

                {notifications.window && (
                    <Suspense fallback={<Loading />}>
                        <Notifications />
                    </Suspense>
                )}

                <Suspense>
                    <User />
                </Suspense>
            </Flex>
        </HeaderContainer>
    );
}
