import React, { useContext } from "react";
import styled from "styled-components";
import { RoomContext } from "src/context/RoomContext";
import { UsersContext } from "src/context/UsersContext";
import Member from "src/components/Members/Member";

const Container = styled.div`
    border-left: 3px solid var(--main);
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 93vh;
    // overflow-y: auto;
`;

const H2 = styled.h2`
    color:#fff;
    margin-bottom:1rem;
`

export default function Members() {
    const { roomData } = useContext(RoomContext);
    const users = useContext(UsersContext);

    return (
        <Container>
            <H2>Members</H2>
            {users?.map((user) => {
                if (
                    roomData.members?.includes(user.id) ||
                    roomData.owner === user.id
                ) {
                    return (
                        <>
                            <Member
                                name={user.name}
                                img={user.img}
                                status={user.status}
                                email={user.email}
                            />
                        </>
                    );
                }
            })}
        </Container>
    );
}
