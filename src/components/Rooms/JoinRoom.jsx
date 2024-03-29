import React, { useContext } from "react";
import styled from "styled-components";
import { arrayUnion, updateDoc, doc } from "firebase/firestore";
import { firestoreDb } from "src/firebase-config";
import { SnackContext } from "src/context/SnackContext";
import { AuthContext } from "src/context/AuthContext";

const Button = styled.button`
  background-color: var(--main);
  color: var(--light);
  font: var(--sm) main-bold;
  border: 1px solid var(--main);
  border-radius: 5px;
  padding: 5px 20px;

  &:hover {
    color: #fff;
    cursor: pointer;
  }
`;

export default function JoinRoom({ name, creatorId }) {
  const { showSnack } = useContext(SnackContext);
  const { userData } = useContext(AuthContext);

  const sendJoinRequest = (creatorId, name) => {
    try {
      const creatorDoc = doc(firestoreDb, "Users", creatorId);
      updateDoc(creatorDoc, {
        notifications: arrayUnion({
          userID: userData.id,
          userName: userData.name,
          userImg: userData.img,
          roomName: name,
          note: `${userData.name} wanna join your room: ${name}`,
          time: new Date().toLocaleTimeString(),
        }),
      });
      showSnack(
        `Your request to join room: ${name} has been sent successfully!`,
        "success"
      );
    } catch (e) {
      console.log(e);
      showSnack("You have to login first!", "error");
    }
  };

  const roomToPending = (room) => {
    try {
      const userDoc = doc(firestoreDb, "Users", userData.id);
      updateDoc(userDoc, {
        rooms: arrayUnion({ name: room, role: "pending" }),
        notifications: arrayUnion({
          note: `You have sent request to join room: ${room}`,
          time: new Date().toLocaleTimeString(),
        }),
      });
    } catch (e) {
      console.log(e);
      showSnack("You have to login first!", "error");
    }
  };

  const join = (creatorId, room) => {
    if (!userData) {
      showSnack("You have to login first!", "error");
      return;
    }
    try {
      sendJoinRequest(creatorId, room);
      roomToPending(room);
      showSnack(
        `Your request to join room: ${room} has been sent successfully!`,
        "success"
      );
    } catch (e) {
      console.log(e);
      showSnack("Error!", "error");
    }
  };

  return <Button onClick={() => join(creatorId, name)}>Join</Button>;
}
