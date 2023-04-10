import { ref, child, push, update } from "firebase/database";
import React, { useContext } from "react";
import { db, firestoreDb } from "../../firebase-config";
import { AuthContext } from "../context/AuthContext";
import { RoomContext } from "../context/RoomContext";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Snackbar from "./Snackbar";
import { setDoc, updateDoc, doc } from "firebase/firestore";

const Container = styled.div`
    margin: 1rem;
    height: 9vh;
`;

const FormContainer = styled.div`
    margin-top: 1rem;
    font-weight: bold;
    border-top: 1px solid #000;
    display: flex;
    justify-content: space-between;
    &::focued {
        outline: none;
    }
`;

const Input = styled.input`
    font-size: 1.2rem;
    padding: 0 1rem;
    border: none;
    outline: none;
    width: 100%;
    &::placeholder {
        color: #cacaca;
    }
`;
const Button = styled.button`
    all: unset;
    padding: 1rem;
`;
const I = styled.i`
    font-size: 2rem;
    &:hover {
        color: #ccc;
        cursor: pointer;
    }
`;

export default function SendMessage() {
    const { room, members } = useContext(RoomContext);
    const { userData } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();

    console.log(members);

    function onSubmit(data) {
        if (userData) {
            if (
                members?.find((m) => m == userData.id) ||
                room.creatorId == userData.id
            ) {
                try {
                    const msg = {
                        uid: userData.id,
                        msg: data.message,
                        time: new Date().toLocaleString(),
                    };

                    const newMsgKey = push(child(ref(db), "messages")).key;
                    const updates = {};
                    updates[`messages/${room.name}/${newMsgKey}/`] = msg;
                    update(ref(db), updates);
                    updateDoc(doc(firestoreDb, "Rooms", room.name), {
                        lastMsg: {
                            msg: data.message,
                            time: new Date().toLocaleTimeString(),
                        },
                    });
                } catch (e) {
                    console.log(e);
                    console.log("error sending message.");
                }
            } else {
                alert("You should be a member to send a message.");
            }
        } else {
            alert("You have to log in first.");
        }
    }
    return (
        <>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormContainer>
                        <Input
                            {...register("message")}
                            placeholder='Type a message ...'
                        />
                        <Button type='submit'>
                            <I className='bi bi-send-fill'></I>
                        </Button>
                    </FormContainer>
                </form>
            </Container>
            <Snackbar />
        </>
    );
}

// Send Message proccess :
//      - if logged in and member of room, user can send a message.
//      - room and members is came from RoomContext.
//      - send message create new object in messages/room object has (userInfo, msg and time)
