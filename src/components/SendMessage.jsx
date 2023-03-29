import { ref, child, push, update } from "firebase/database";
import React, { useContext } from "react";
import { db } from "../../firebase-config";
import { AuthContext } from "../context/AuthContext";
import { RoomContext } from "../context/RoomContext";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Container = styled.div`
    margin: 1rem;
`;

const Input = styled.input`
    font-size: 1rem;
    border: none;
    outline: none;
    width: 100%;
    &::placeholder {
        color: #cacaca;
    }
`;
const Button = styled.button`
    all: unset;
    background-color: black;
    padding: 1rem;
    color: #cacaca;
`;

const FormContainer = styled.div`
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
        if (user.displayName) {
            try {
                const msg = {
                    user: user?.displayName,
                    uid: user?.uid,
                    userImg: user?.photoURL,
                    msg: data.message,
                    time: new Date(),
                };

                const newMsgKey = push(child(ref(db), "messages")).key;
                const updates = {};
                updates[`messages/${room}/${newMsgKey}`] = msg;
                return update(ref(db), updates);
            } catch (e) {
                console.log(e);
                console.log("error sending message.");
            }
        } else {
            alert("You have to log in first.");
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
