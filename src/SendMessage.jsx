import { ref, child, push, update } from "firebase/database";
import React, { useContext } from "react";
import { db } from "../firebase-config";
import { AuthContext } from "AuthContext";
import { RoomContext } from "./RoomContext";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Container = styled.div`
    margin: 1rem;
`;

export const Input = styled.input`
    font-size: 1rem;
    padding: 0.5rem;
    border: none;
    outline: none;
    width: 100%;
    &::placeholder {
        color: #cacaca;
    }
`;
export const Button = styled.button`
    all: unset;
    background-color: black;
    padding: 1rem;
    color: #cacaca;
`;

export const FormContainer = styled.div`
    padding-top: 1rem;
    font-weight: bold;
    border-top: 1px solid #000;
    display: flex;
    justify-content: space-between;
    &::focued {
        outline: none;
    }
`;

export default function SendMessage() {
    const { room } = useContext(RoomContext);
    const { user } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();

    function send(data) {
        try {
            const msg = {
                sender: user?.displayName,
                msg: data.message,
            };

            const newMsgKey = push(child(ref(db), "messages")).key;
            const updates = {};
            updates[`messages/${room}/${newMsgKey}`] = msg;
            return update(ref(db), updates);
        } catch (e) {
            console.log(e);
            console.log("error sending message.");
        }
    }
    return (
        <Container>
            <form onSubmit={handleSubmit(send)}>
                <FormContainer>
                    <Input
                        {...register("message")}
                        placeholder='Type a message ...'
                    />
                    <Button type='submit'>Send</Button>
                </FormContainer>
            </form>
        </Container>
    );
}
