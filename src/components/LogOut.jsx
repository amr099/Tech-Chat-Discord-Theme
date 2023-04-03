import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useContext, useState } from "react";
import { AuthContext } from "context/AuthContext";
import styled from "styled-components";
// import { updateDoc, doc } from "firebase/firestore";
// import { db } from "../firebase-config";

const Container = styled.div`
    position: absolute;
    top: 7vh;
    right: 2vw;
    background-color: #f4f4f4;
    color: #000;
    padding: 20px;
    border-radius: 5px 5px;
`;
export function LogOut({ setLogOut }) {
    const Out = async () => {
        await signOut(auth);
        setLogOut(false);
        // let userRef = await doc(db, "Users", user.email);
        // await updateDoc(userRef, {
        //     status: "offline",
        // });
    };

    return (
        <Container>
            <button onClick={Out}>SignOut</button>
        </Container>
    );
}
