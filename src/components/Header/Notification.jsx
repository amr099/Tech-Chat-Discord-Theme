import React, { useContext } from "react";
import styled from "styled-components";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestoreDb } from "src/firebase-config";
import { SnackContext } from "src/context/SnackContext";
import { AuthContext } from "src/context/AuthContext";

const Flex = styled.div`
    display: flex;
    gap: 10px;
    justify-content: ${(props) => props.justfiy};
    align-items: ${(props) => props.align};
    flex-direction: ${(props) => props.direction};
    padding: 5px;
    margin-left:10px;
    border-radius:5px;
    &:hover {
        background-color: var(--dark);
    }
`;

const Img = styled.img`
    height: 30px;
    width: 30px;
    border-radius: 50%;
`;

const Note = styled.p`
    color:var(--light);
    font:var(--sm) main-semibold;
    word-break: keep-all;
`;
const Accept = styled.i`
    font-size: 1.5rem;
    color: #3ba55c;
    &:hover {
        cursor: pointer;
        color: #0f0;

    }
`;
const Delete = styled.i`
    font-size: 1.5rem;
    color:var(--light)
`;

const Span = styled.span`
    font-size: 0.7rem;
    align-self: end;
    text-overflow: ellipsis;
    color: #aaa;
    float: right;
    margin: 5px 0;
`;

export default function Notification({ noteObj, note, userImg, time }) {
    const { showSnack } = useContext(SnackContext);
    const { userData } = useContext(AuthContext);

    const accept = (note) => {
        // Update User's rooms.
        // Send acceptance note.
        try {
            try {
                const userDoc = doc(firestoreDb, "Users", note.userID);
                updateDoc(userDoc, {
                    rooms: arrayRemove({
                        name: note.roomName,
                        role: "pending",
                    }),
                    rooms: arrayUnion({ name: note.roomName, role: "member" }),
                    notifications: arrayUnion({
                        note: `You have joined room : ${note.roomName}!`,
                        time: new Date().toLocaleTimeString(),
                    }),
                });
            } catch (e) {
                showSnack(`Error!`, "error");
                console.log(e);
                console.log("Error adding new room and notififcation to user.");
            }

            // Update Room's members.
            try {
                const roomDoc = doc(firestoreDb, "Rooms", note.roomName);
                updateDoc(roomDoc, {
                    members: arrayUnion(note.userID),
                });
            } catch (e) {
                console.log(e.message);
                showSnack(`Error!`, "error");
            }

            // Delete note after acceptance.
            try {
                const userDoc = doc(firestoreDb, "Users", userData.id);
                updateDoc(userDoc, {
                    notifications: arrayRemove(note),
                });
            } catch {
                showSnack(`Error!`, "error");
                console.log(e);
                console.log("error deleting note after acceptance.");
            }

            showSnack(
                `You have accepted new member to room: ${note.roomName}!`,
                "success"
            );
        } catch (e) {
            console.log(e);
            showSnack(`Error!`, "error");
        }
    };

    const onDelete = async (note) => {
        try {
            // Delete note.
            const userDoc = doc(firestoreDb, "Users", userData.id);
            updateDoc(userDoc, {
                notifications: arrayRemove(note),
            });
            // send rejection via note.
            if (note.userID) {
                const memberDoc = doc(firestoreDb, "Users", note.userID);
                updateDoc(memberDoc, {
                    rooms: arrayRemove({
                        name: note.roomName,
                        role: "pending",
                    }),
                    notifications: arrayUnion({
                        note: `You have been rejected to join room : ${note.roomName}!`,
                        time: new Date().toLocaleString(),
                    }),
                });
                showSnack(`Request has been deleted successfully!`, "success");
            }
        } catch (e) {
            console.log(e);
            showSnack(`Error!`, "error");
        }
    };

    return (
        <Flex justfiy={"space-between"} align={"center"}>
            <Flex key={time}>
                {userImg && <Img src={userImg}></Img>}
                <Note>
                    {note} <Span>{time} </Span>
                </Note>
            </Flex>
            <Flex align={"center"}>
                {userImg && (
                    <>
                        <Accept
                            className='bi bi-check-circle'
                            onClick={() => accept(noteObj)}
                        ></Accept>
                    </>
                )}
                <Delete
                    className='bi bi-x'
                    onClick={() => onDelete(noteObj)}
                ></Delete>
            </Flex>
        </Flex>
    );
}
