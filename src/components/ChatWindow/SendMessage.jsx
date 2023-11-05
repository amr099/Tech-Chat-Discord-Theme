import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { firestoreDb, storage } from "src/firebase-config";
import { AuthContext } from "src/context/AuthContext";
import { RoomContext } from "src/context/RoomContext";
import { SnackContext } from "src/context/SnackContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import EmojiPicker from "emoji-picker-react";

const Container = styled.form`
  background-color: var(--semi-dark);
  margin: 0.5rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  border-raduis: 5px;
  &::focued {
    outline: none;
  }
`;

const Flex = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  background-color: var(--semi-dark);
  color: var(--light);
  font: var(--sm) main;
  padding: 0 1rem;
  border: none;
  outline: none;
  width: 100%;
  border &::placeholder {
    color: #cacaca;
  }
`;

const FileInput = styled.input`
  position: absolute;
  width: 30px;
  opacity: 0;
  z-index: 2;
  &:hover {
    cursor: pointer;
  }
  &:after {
    content: "nameasdasdasd";
    opacity: 1;
    color: #fff;
  }
  @media (max-width: 769px) {
    width: 15px;
  }
`;

const EmojiBox = styled.div`
  position: absolute;
  bottom: 4rem;
  right: 5rem;
  @media (max-width: 769px) {
    right: 0;
  }
`;

const Button = styled.button`
  all: unset;
  background-color: var(--semi-dark);
  padding: 1rem;
`;

const I = styled.i`
  font-size: var(--md);
  color: var(--main);
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 769px) {
    font-size: var(--sm);
  }
`;

export default function SendMessage() {
  const { roomData } = useContext(RoomContext);
  const { userData } = useContext(AuthContext);
  const { showSnack } = useContext(SnackContext);
  const [msg, setMsg] = useState("");
  const [img, setImg] = useState("");
  const fileRef = useRef(null);
  const [openEmoji, setEmoji] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (msg === "") {
      showSnack("There's no message to send!", "error");
      return;
    }
    if (!userData) {
      showSnack("You have to login first!", "error");
      return;
    }
    if (!roomData.members?.find((m) => m == userData.id)) {
      showSnack("Members only can send to room!", "error");
      return;
    }

    if (img) {
      /** @type {any} */
      const metadata = {
        contentType: "image/jpeg",
      };

      const storageRef = ref(storage, "images/" + msg);
      const uploadTask = uploadBytesResumable(storageRef, img[0], metadata);
      let progress;
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
          return;
        },
        () => {
          if (progress === 100) {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                const newMsg = {
                  uid: userData.id,
                  msg: msg,
                  time: new Date().toLocaleString(),
                  img: downloadURL,
                };
                await updateDoc(doc(firestoreDb, "Rooms", roomData.name), {
                  messages: arrayUnion(newMsg),
                });
                setMsg("");
                setImg(null);
                fileRef.current.value = null;
                return;
              }
            );
          }
        }
      );
    } else {
      const newMsg = {
        uid: userData.id,
        msg: msg,
        time: new Date().toLocaleString(),
      };

      await updateDoc(doc(firestoreDb, "Rooms", roomData.name), {
        messages: arrayUnion(newMsg),
      });
      setMsg("");
      setImg(null);
      fileRef.current.value = null;
    }
    try {
    } catch (e) {
      showSnack("Error!", "error");
      console.log(e);
      console.log("error sending message.");
    }
  }

  return (
    <>
      <Container>
        <Input
          autoComplete="off"
          placeholder="Type a message ..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <Flex>
          <I className="bi bi-paperclip" id="file-icon"></I>
          <FileInput
            filename="name"
            type="file"
            onChange={(e) => setImg(e.target.files)}
            ref={fileRef}
          />
          {openEmoji && (
            <EmojiBox>
              <EmojiPicker
                onEmojiClick={(e) => setMsg((prev) => prev + e.emoji)}
                width="250px"
                height="350px"
              />
            </EmojiBox>
          )}
          <I
            className="bi bi-emoji-laughing-fill"
            onClick={() => setEmoji(!openEmoji)}
          ></I>
          <hr />
          <Button onClick={onSubmit}>
            <I className="bi bi-send-fill"></I>
          </Button>
        </Flex>
      </Container>
    </>
  );
}
