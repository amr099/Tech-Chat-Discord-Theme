import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";
import Modal from "react-modal";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { LogOut } from "./LogOut";

const ImgContainer = styled.div`
    min-width: 80px;
    max-width: 200px;
    text-align: right;
`;

const Img = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    align-self: center;
`;

const LoginButton = styled.button`
    min-width: 80px;
    max-width: 200px;
    display: flex;
    gap: 5px;
    align-items: center;
    padding: 5px 10px;

    &:hover {
        background-color: #aaa;
        border-radius: 20px 20px;
        cursor: pointer;
        color: #fff;
    }
`;

const Span = styled.span`
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`;

const customStyles = {
    content: {
        borderRadius: "20px",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

export default function User() {
    const { userData } = useContext(AuthContext);
    const [logOut, setLogOut] = useState(false);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState("login");

    return (
        <>
            {logOut && <LogOut setLogOut={setLogOut} />}
            {userData ? (
                <ImgContainer onClick={() => setLogOut(!logOut)}>
                    {" "}
                    <Img src={userData.img || ""} />{" "}
                </ImgContainer>
            ) : (
                <>
                    <LoginButton onClick={() => setModal(true)}>
                        <i className='bi bi-person-circle'></i> Sign In
                    </LoginButton>
                    <Modal
                        isOpen={modal}
                        onRequestClose={() => setModal(false)}
                        style={customStyles}
                    >
                        {form === "login" ? (
                            <>
                                <LoginForm setModal={setModal} />
                                <p>
                                    <span>Don't have an account. </span>{" "}
                                    <Span onClick={() => setForm("register")}>
                                        Create account
                                    </Span>
                                </p>
                            </>
                        ) : (
                            <>
                                <RegisterForm setModal={setModal} />
                                <p>
                                    <span>Already have an account. </span>{" "}
                                    <Span onClick={() => setForm("login")}>
                                        Log In{" "}
                                    </Span>
                                </p>
                            </>
                        )}
                    </Modal>
                </>
            )}
        </>
    );
}

// Login Process:
//      - Login using gmail popup.
//          - set new object for new user and save his data (id,name,email,img,...)
//          - if logged in before (don't save)
//      - control user from the AuthContext.
//      - fetch userinfo when user changes.
//      - if there's userinfo return img of user. else return login button.
