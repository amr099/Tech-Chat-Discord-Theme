import { ref, child, push, update } from "firebase/database";
import React, { useContext } from "react";
import { db, firestoreDb } from "../../firebase-config";
import { AuthContext } from "../context/AuthContext";
import { RoomContext } from "../context/RoomContext";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Snackbar from "./Snackbar";
import { updateDoc, doc } from "firebase/firestore";
import { SnackContext } from "context/SnackContext";

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
    const { roomData } = useContext(RoomContext);
    const { userData } = useContext(AuthContext);
    const { showSnack } = useContext(SnackContext);
    const { register, handleSubmit } = useForm();

    function onSubmit(data) {
        if (userData) {
            if (
                roomData.members?.find((m) => m == userData.id) ||
                roomData.owner == userData.id
            ) {
                try {
                    const msg = {
                        uid: userData.id,
                        msg: data.message,
                        time: new Date().toLocaleString(),
                    };

                    const newMsgKey = push(child(ref(db), "messages")).key;
                    const updates = {};
                    updates[`messages/${roomData.name}/${newMsgKey}/`] = msg;
                    update(ref(db), updates);
                    updateDoc(doc(firestoreDb, "Rooms", roomData.name), {
                        lastMsg: {
                            msg: data.message,
                            time: new Date().toLocaleString(),
                        },
                    });
                } catch (e) {
                    showSnack("Error!", "error");
                    console.log(e);
                    console.log("error sending message.");
                }
            } else {
                showSnack("Members only can send to room!", "error");
            }
        } else {
            showSnack("You have to login first!", "error");
        }
    }
    return (
        <>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormContainer>
                        <Input
                            autoComplete='off'
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
