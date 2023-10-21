import React, { useContext } from "react";
import styled from "styled-components";
import { setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useForm } from "react-hook-form";
import {  firestoreDb } from "src/firebase-config";
import { AuthContext } from "src/context/AuthContext";
import { SnackContext } from "src/context/SnackContext";

const FormContainer = styled.form`
    display: flex;
    border-bottom: 1px solid #909090;
`;

const Input = styled.input`
    all: unset;
    font: var(-sm) main;
    color: var(--light);
    padding: 1rem;
    width: 100%;
    &::placeholder {
        color: #cacaca;
    }
`;

const I = styled.i`
    font: var(--lg) main-bold;
    margin: 1rem;
    color:#3ba55c;
    &:hover {
        color: #aaa;
    }
`;

export default function CreateRoom({ rooms }) {
    const { register, handleSubmit } = useForm();
    const { userData } = useContext(AuthContext);
    const { showSnack } = useContext(SnackContext);


    function onSubmit(data) {
        if(!userData){showSnack("You have to sign in first.", "error");}
        if (rooms?.find((r) => r.name === data.roomName)){showSnack("Room name already exists.", "error");}

        try {
            const creationMsg = {
                            uid: userData.id,
                            msg: `${userData.name} has created '${data.roomName}' successfully.`,
                            time: new Date().toLocaleString(),
                        }
            // New Room at Rooms Collections.
            setDoc(doc(firestoreDb, "Rooms", data.roomName), {
                name: data.roomName,
                creatorId: userData.id,
                messages:[creationMsg],
                members:[userData.id]
            });
        } catch (e) {
            console.log(e);
            console.log(
                "error setting new room into rooms collection"
            );
            showSnack("Error!.", "error");
        }

        try {
            // New Room at Users rooms.
            updateDoc(doc(firestoreDb, "Users", userData.id), {
                rooms: arrayUnion({
                    name: data.roomName,
                    role: "owner",
                }),
                notifications: arrayUnion({
                    note: `You have created room: ${data.roomName} successfully!`,
                    time: new Date().toLocaleString(),
                }),
            });
        } catch (e) {
            console.log(e);
            console.log("error setting new room into User's rooms");
            showSnack("Error!.", "error");
        }
    } 

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Input
                autoComplete='off'
                {...register("roomName")}
                placeholder='Create new room ...'
            />
            <button type='submit'>
                <I className='bi bi-plus'></I>
            </button>
        </FormContainer>
    );
}


