import React, { useContext } from "react";
import { ref, set, update, push, child } from "firebase/database";
import { db } from "./../firebase-config";
import { AuthContext } from "AuthContext";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Container } from "Header";

export const Input = styled.input`
    font-size: 1rem;
    padding: 0.5rem;
    border: none;
    outline: none;
    background-color: inherit;
`;
export const Button = styled.button`
    all: unset;
    max-width: fit-content;
`;

export const FormContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #909090;
    padding: 1rem;
    &::focued {
        outline: none;
    }
`;

export default function CreateRoom() {
    const { register, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
    function createRoom(data) {
        if (user) {
            try {
                try {
                    // Set new record into rooms collection.
                    set(ref(db, "rooms/" + data.roomName), {
                        name: data.roomName,
                        creatorName: user?.displayName,
                        creatorId: user?.uid,
                        members: {
                            id: user?.uid,
                            name: user?.displayName,
                        },
                    });
                } catch (e) {
                    console.log(e);
                    console.log("error setting new room into rooms collection");
                    return;
                }
                try {
                    // Set new record for newly created room into messages collection.
                    set(ref(db, "messages/" + data.roomName), {
                        msg1: `${data.roomName} has been created successfully`,
                    });
                } catch (e) {
                    console.log(e);
                    console.log(
                        "error setting new room into messages collection"
                    );

                    return;
                }
                try {
                    // Add new room into creator rooms.
                    const room = {
                        name: data.roomName,
                    };
                    const updates = {};
                    updates[`users/${user.uid}/rooms/`] = room;
                    return update(ref(db), updates);
                } catch (e) {
                    console.log(e);
                    console.log("error adding new room into creator's rooms");
                    return;
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
    return (
        <Container>
            <form onSubmit={handleSubmit(createRoom)}>
                <FormContainer>
                    <Input
                        {...register("roomName")}
                        placeholder='Create new room ...'
                    />
                    <Button type='submit'>
                        <i class='bi bi-plus'></i>
                    </Button>
                </FormContainer>
            </form>
        </Container>
    );
}
