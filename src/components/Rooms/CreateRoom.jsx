import React, { useContext, useReducer, useState } from "react";
import styled from "styled-components";
import { setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { firestoreDb } from "src/firebase-config";
import { AuthContext } from "src/context/AuthContext";
import Modal from "react-modal";

const customStyles = {
  content: {
    backgroundColor: "#36393F",
    padding: "2rem",
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

const Label = styled.label`
  font: var(--sm) main-semibold;
  color: var(--light);
  margin-bottom: 0.5rem;
  display: inline-block;
`;

const Input = styled.input`
  all: unset;
  font: var(-md) main;
  background-color: var(--dark);
  color: var(--light);
  padding: 1rem;
  width: 90%;
  margin: 0 auto;
  &::placeholder {
    color: #cacaca;
  }
`;

const I = styled.i`
  font: var(--md) main-bold;
  color: var(--light);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Button = styled.button`
  font: var(--sm) main-bold;
  padding: 0.5rem 0;
  border-radius: 2px;
  margin: 1rem auto;
  background-color: var(--green);
  color: #fff;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #3ba55c;
    cursor: pointer;
  }
`;

const Submit = styled(Button)`
  width: min-content;
  background-color: var(--main);
  padding: 0.5rem 1rem;
  border-radius: 2px;
  margin: 0;
  font: var(--sm);
  &:hover {
    background-color: var(--main);
  }
`;

const Cancel = styled.button`
  color: var(--light);
  &:hover {
    cursor: pointer;
    color: #fff;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 2rem;
`;

const Error = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
  background-color: #4a443b;
  font: var(--sm) main-semibold;
  border: 2px solid #faa61a;
  border-radius: 3px;
`;

const ErrorIcon = styled.i`
  color: #faa61a;
  margin-right: 0.2rem;
`;

const Success = styled(Error)`
  background-color: var(--green);
  font: var(--sm) main-semibold;
  border: 2px solid green;
  border-radius: 3px;
  color: #fff;
`;

const SuccessIcon = styled(ErrorIcon)`
  color: #fff;
`;

const reducer = (state, action) => {
  switch (action.type) {
    case "success":
      return { success: true, error: "" };
    case "error":
      return { success: false, error: action.payload };
    case "reset":
      return { success: false, error: "" };
  }
};

export default function CreateRoom({ rooms }) {
  const { register, handleSubmit, reset } = useForm();
  const { userData } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    success: false,
    error: "",
  });

  const showModal = () => {
    setModal(true);
  };
  const hideModal = () => {
    setModal(false);
    dispatch({ type: "reset" });
    reset();
  };

  async function onSubmit(data) {
    dispatch({ type: "reset" });
    if (data.roomName === "") {
      dispatch({ type: "error", payload: "Please enter room name" });
      return;
    }
    if (!userData) {
      dispatch({ type: "error", payload: "You have to sign in first" });
      return;
    }
    if (rooms?.find((r) => r.name === data.roomName)) {
      dispatch({ type: "error", payload: "Room name already exists" });
      return;
    }

    try {
      const creationMsg = {
        uid: userData.id,
        msg: `${userData.name} has created '${data.roomName}' successfully.`,
        time: new Date().toLocaleString(),
      };
      // New Room at Rooms Collections.
      await setDoc(doc(firestoreDb, "Rooms", data.roomName), {
        name: data.roomName,
        creatorId: userData.id,
        messages: [creationMsg],
        members: [userData.id],
      });
    } catch (e) {
      console.log(e);
      console.log("error setting new room into rooms collection");
      dispatch({ type: "error", payload: "Error" });
    }

    try {
      // New Room at Users rooms.
      await updateDoc(doc(firestoreDb, "Users", userData.id), {
        rooms: arrayUnion({
          name: data.roomName,
          role: "owner",
        }),
        notifications: arrayUnion({
          note: `You have created room: ${data.roomName} successfully!`,
          time: new Date().toLocaleString(),
        }),
      });
      reset();
      dispatch({ type: "success" });
    } catch (e) {
      console.log(e);
      console.log("error setting new room into User's rooms");
      dispatch({ type: "error", payload: "Error" });
    }
  }

  return (
    <>
      <Button onClick={showModal}>
        <I className="bi bi-plus"></I>Create new room
      </Button>
      <Modal isOpen={modal} onRequestClose={hideModal} style={customStyles}>
        {state?.error && (
          <Error>
            <ErrorIcon className="bi bi-exclamation-circle-fill"></ErrorIcon>{" "}
            {state?.error}
          </Error>
        )}
        {state?.success && (
          <Success>
            <SuccessIcon className="bi bi-check-circle-fill"></SuccessIcon> New
            Room has been created successfully
          </Success>
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label>Name</Label>
            <Input
              autoComplete="off"
              {...register("roomName")}
              placeholder="room name ..."
            />
          </div>
          <ButtonsWrapper>
            <Cancel onClick={hideModal}>Cancel</Cancel>
            <Submit onClick={onSubmit}>Okay</Submit>
          </ButtonsWrapper>
        </Form>
      </Modal>
    </>
  );
}
