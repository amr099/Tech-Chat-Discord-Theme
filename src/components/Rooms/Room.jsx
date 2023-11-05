import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "src/context/AuthContext";
import { RoomContext } from "src/context/RoomContext";
import { UsersContext } from "src/context/UsersContext";
import JoinRoom from "./JoinRoom";

const RoomContainer = styled.div`
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 5px;
  background-color: ${(props) =>
    props.selected ? "var(--semi-dark)" : "transparent"};
  &:hover {
    cursor: pointer;
    background-color: var(--semi-dark);
  }
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  @media (max-width: 769px) {
    flex-direction: column;
    gap: 5px;
  }
`;
const H3 = styled.h3`
  color: ${(props) => (props.selected ? "#fff" : "var(--light)")};
  font: var(--sm) ${(props) => (props.selected ? "main-bold" : "main")};
  text-align: center;
`;
// const P = styled.p`
//   color: #c1c1c1;
//   align-self: end;
//   font: var(--xs) main-semibold;
// `;
// const Span = styled.span`
//   font-size: 0.7rem;
//   align-self: end;
//   text-overflow: ellipsis;
//   color: #aaa;
// `;

export default function Room({ name, lastMsg, lastMsgTime, creatorId }) {
  const { selectRoom } = useContext(RoomContext);
  const [joinedRooms, setJoinedRooms] = useState([]);
  const users = useContext(UsersContext);
  const { userData } = useContext(AuthContext);
  const { roomData } = useContext(RoomContext);

  useEffect(() => {
    if (userData) {
      for (let i in users) {
        if (users[i].id === userData.id) {
          setJoinedRooms(users[i].rooms);
        }
      }
    } else {
      setJoinedRooms([]);
    }
  }, [userData]);

  return (
    <RoomContainer
      selected={name == roomData.name}
      onClick={() => {
        selectRoom(name);
      }}
    >
      <Flex>
        <Flex>
          <H3 selected={name == roomData.name}>{name}</H3>
          <Flex>
            {/* <P>{lastMsg || "No Messages Yet!"}</P> */}
            {/* <Span>{lastMsgTime}</Span> */}
          </Flex>
        </Flex>
        {!joinedRooms?.find((r) => r.name === name) && (
          <JoinRoom name={name} creatorId={creatorId} />
        )}
      </Flex>
    </RoomContainer>
  );
}
