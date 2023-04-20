import { signOut } from "firebase/auth";
import styled from "styled-components";

import { auth } from "src/firebase-config";

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
export function LogOut({ logOutBtn, setLogOutBtn }) {
    const Out = async () => {
        await signOut(auth);
        setLogOutBtn(false);
    };

    return (
        <Container opacity={logOutBtn.toString()}>
            <button onClick={Out}>SignOut</button>
        </Container>
    );
}
