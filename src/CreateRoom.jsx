import React, { useContext } from "react";
import { ref, set } from "firebase/database";
import { db } from "./../firebase-config";
import { AuthContext } from "AuthContext";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function CreateRoom() {
    const { user } = useContext(AuthContext);
    console.log(user);
    function createRoom() {
        set(ref(db, "rooms/" + "roomName"), {
            name: "roomName",
            creator: user?.displayName,
            members: {
                name: user?.displayName,
            },
        });
    }
    return (
        <>
            <button onClick={createRoom}>Submit</button>
        </>
    );
}
