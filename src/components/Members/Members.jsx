import React, { useContext } from "react";
import styled from "styled-components";
import { RoomContext } from "src/context/RoomContext";
import { UsersContext } from "src/context/UsersContext";
import Member from "src/components/Members/Member";

const Container = styled.div`
    border-left: 3px solid #f4f4f4;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: 90vh;
    overflow-y: auto;
`;

export default function Members() {
    const { roomData } = useContext(RoomContext);
    const users = useContext(UsersContext);

    return (
        <Container>
            <h2>Members</h2>
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
