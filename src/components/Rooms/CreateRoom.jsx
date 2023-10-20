import React, { useContext } from "react";
import styled from "styled-components";
import { setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, set } from "firebase/database";
import { useForm } from "react-hook-form";
import { db, firestoreDb } from "src/firebase-config";
import { AuthContext } from "src/context/AuthContext";
import { SnackContext } from "src/context/SnackContext";

const FormContainer = styled.form`
    display: flex;
    border-bottom: 1px solid #909090;
`;

const Input = styled.input`
    all: unset;
    font-size: 1.2rem;
    padding: 1rem;
    width: 100%;
    &::placeholder {
        color: #cacaca;
    }
`;

const I = styled.i`
    font-size: 2rem;
    margin: 1rem;

    &:hover {
        color: #aaa;
    }
`;

export default function CreateRoom({ rooms }) {
    const { register, handleSubmit } = useForm();
    const { userData } = useContext(AuthContext);
    const { showSnack } = useContext(SnackContext);

    function onSubmit(data) {
        if (userData?.id) {
            if (!rooms?.find((r) => r.name === data.roomName)) {
                try {
                    try {
                        // New Room at Rooms Collections.
                        setDoc(doc(firestoreDb, "Rooms", data.roomName), {
                            name: data.roomName,
                            creatorId: userData.id,
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

                    try {
                        // New room into messages object.
                        set(ref(db, "messages/" + data.roomName), {
                            creationMsg: {
                                uid: userData.id,
                                msg: `${userData.name} has created '${data.roomName}' successfully.`,
                                time: new Date().toLocaleString(),
                            },
                        });
                        showSnack(
                            `Room: ${data.roomName} has been created successfully.`,
                            "success"
                        );
                    } catch (e) {
                        console.log(e);
                        console.log(
                            "error setting new room into messages collection"
                        );
                        showSnack("Error!.", "error");
                    }
                } catch (e) {
                    console.log(e);
                    console.log("error creating new room");
                    showSnack("Error!.", "error");
                }
            } else {
                showSnack("Room name already exists.", "error");
            }
        } else {
            showSnack("You have to sign in first.", "error");
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

// Create Room Proccess :
//  - You should be logged in
//  - can't create room with repeated name.
//  - if room entered :
//      - set new record into rooms object has (id,name,creatorName,creatorId)
//      - update members to contain creator.
//      - set record into messages object has creationMessage
//      - set record into user's rooms has room's info.
