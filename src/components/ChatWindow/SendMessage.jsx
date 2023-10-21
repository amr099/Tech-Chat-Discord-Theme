import React, { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import {  firestoreDb } from "src/firebase-config";
import { AuthContext } from "src/context/AuthContext";
import { RoomContext } from "src/context/RoomContext";
import { SnackContext } from "src/context/SnackContext";

const Container = styled.form`
    margin: 0.5rem ;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    border-raduis:5px;
    &::focued {
        outline: none;
    }
`;
const Input = styled.input`
    background-color:var(--semi-dark);
    color:var(--light);
    font:var(--sm) main;
    padding: 0 1rem;
    border: none;
    outline: none;
    width: 100%;
    border
    &::placeholder {
        color: #cacaca;
    }
`;
const Button = styled.button`
    all: unset;
    background-color:var(--semi-dark);
    padding: 1rem;
`;
const I = styled.i`
    font-size: var(--md);
    color:var(--main);
    &:hover {
        cursor: pointer;
    }
`;

export default function SendMessage() {
    const { roomData } = useContext(RoomContext);
    const { userData } = useContext(AuthContext);
    const { showSnack } = useContext(SnackContext);
    const { register, handleSubmit,reset } = useForm();

    async function onSubmit(data) {
        if (data.message ===''){showSnack("There's no message to send!", "error"); return}
        if (!userData) {showSnack("You have to login first!", "error"); return}
        if (
            !roomData.members?.find((m) => m == userData.id) 
        ){showSnack("Members only can send to room!", "error");return}

        try {
            await updateDoc(doc(firestoreDb, "Rooms", roomData.name), {
                messages: arrayUnion({
                    uid: userData.id,
                    msg: data.message,
                    time: new Date().toLocaleString(),
                }),
            });
            reset();
        } catch (e) {
            showSnack("Error!", "error");
            console.log(e);
            console.log("error sending message.");
        }
    }
    return (
        <>
            <Container onSubmit={handleSubmit(onSubmit)}>
                    {/* <FormContainer> */}
                        <Input
                            autoComplete='off'
                            {...register("message")}
                            placeholder='Type a message ...'
                        />
                        <Button type='submit'>
                            <I className='bi bi-send-fill'></I>
                        </Button>
                    {/* </FormContainer> */}
            </Container>
        </>
    );
}

// Send Message proccess :
//      - if logged in and member of room, user can send a message.
//      - room and members is came from RoomContext.
//      - send message create new object in messages/room object has (userInfo, msg and time)
