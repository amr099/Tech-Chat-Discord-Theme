import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useContext, useState } from "react";
import { AuthContext } from "context/AuthContext";
import styled from "styled-components";
// import { updateDoc, doc } from "firebase/firestore";
// import { db } from "../firebase-config";

const Container = styled.div`
    position: absolute;
    top: 7.5vh;
    right: 0.5vw;
    background-color: #fff;
    color: #cdcfd0;
    border: 1px solid #cdcfd0;
    border-radius: 20px 20px;
    padding: 0.5rem 1rem;
    transition: ease-in-out 0.2s;
    font-weight: bold;
    opacity: ${(props) => (props.opacity === "true" ? "1" : "0")};

    &:hover {
        cursor: pointer;
        background-color: #e3e5e5;
        color: #979c9e;
    }
`;
export function LogOut({ logOut, setLogOut }) {
    const Out = async () => {
        await signOut(auth);
        setLogOut(false);
        // let userRef = await doc(db, "Users", user.email);
        // await updateDoc(userRef, {
        //     status: "offline",
        // });
    };

    return (
        <Container opacity={logOut.toString()}>
            <button onClick={Out}>SignOut</button>
        </Container>
    );
}
