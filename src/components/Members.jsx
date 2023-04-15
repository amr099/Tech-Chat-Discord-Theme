import { RoomContext } from "context/RoomContext";
import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "context/AuthContext";
import { UsersContext } from "context/UsersContext";

const Img = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
`;

const Container = styled.div`
    border-left: 3px solid #f4f4f4;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: 90vh;
    overflow-y: auto;
`;

const Flex = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: ${(props) => props.justify};
`;

const Span = styled.span`
    font-weight: bold;
`;

const Status = styled.div`
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: ${(props) =>
        props.status === "online" ? "green" : "red"};
`;

export default function Members() {
    const { roomData } = useContext(RoomContext);
    const { userData } = useContext(AuthContext);
    const users = useContext(UsersContext);

    return (
        <Container>
            <Flex>
                <h2>Members</h2>
            </Flex>
            {users?.map((user) => {
                if (roomData?.members?.find((m) => m === user?.id)) {
                    return (
                        <Flex justify={"space-between"} key={user.email}>
                            <Flex>
                                <Img src={user.img}></Img>
                                <Span>{user.name}</Span>
                            </Flex>
                            {user?.id === userData?.id ? (
                                "You"
                            ) : (
                                <Status status={user?.status}></Status>
                            )}
                        </Flex>
                    );
                }
            })}
        </Container>
    );
}
