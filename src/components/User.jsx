import React, { useContext, useState, useReducer } from "react";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";
import Modal from "react-modal";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { LogOut } from "./LogOut";

const Img = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;

    &:hover {
        cursor: pointer;
    }
`;

const LoginButton = styled.button`
    color: #766fc3;
    border: 1px solid #766fc3;
    border-radius: 20px 20px;
    padding: 5px 20px;
    min-width: 80px;
    max-width: 200px;
    display: flex;
    gap: 5px;
    align-items: center;

    &:hover {
        background-color: #6b4eff;
        color: #fff;
        border-radius: 20px 20px;
        cursor: pointer;
    }
`;

const Span = styled.span`
    font-weight: bold;
    color: #6b4eff;
    &:hover {
        cursor: pointer;
    }
`;

const customStyles = {
    content: {
        borderRadius: "20px",
        maxHeight: "90vh",
        overflow: "auto",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SUCCESS":
            return { success: true, error: "", loading: false };
        case "ERROR":
            return { success: false, error: action.payload, loading: false };
        case "LOADING":
            return { success: false, error: "", loading: true };
        default:
            return state;
    }
};

export default function User() {
    const { userData } = useContext(AuthContext);
    const [logOutBtn, setLogOutBtn] = useState(false);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState("login");
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        error: "",
        success: false,
    });

    const setFormState = (type, payload) => {
        dispatch({ type: type, payload: payload });
    };

    const showModal = () => {
        setModal(true);
    };
    const hideModal = () => {
        setModal(false);
    };

    const toggleLogOutButton = () => {
        setLogOutBtn(!logOutBtn);
    };

    return (
        <>
            <LogOut setLogOutBtn={setLogOutBtn} logOutBtn={logOutBtn} />
            {userData ? (
                <Img src={userData.img} onClick={toggleLogOutButton} />
            ) : (
                <>
                    <LoginButton onClick={showModal}>
                        <i className='bi bi-person-circle'></i> Sign In
                    </LoginButton>
                    <Modal
                        isOpen={modal}
                        onRequestClose={hideModal}
                        style={customStyles}
                    >
                        {form === "login" ? (
                            <>
                                <LoginForm
                                    hideModal={hideModal}
                                    setFormState={setFormState}
                                    state={state}
                                />
                                <p>
                                    <span>Don't have an account. </span>{" "}
                                    <Span onClick={() => setForm("register")}>
                                        Create account
                                    </Span>
                                </p>
                            </>
                        ) : (
                            <>
                                <RegisterForm
                                    hideModal={hideModal}
                                    setFormState={setFormState}
                                    state={state}
                                />
                                <p>
                                    <span>Already have an account. </span>{" "}
                                    <Span onClick={() => setForm("login")}>
                                        Sign In
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
