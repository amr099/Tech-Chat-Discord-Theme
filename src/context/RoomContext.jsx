import React, { createContext, useEffect, useReducer } from "react";
import { firestoreDb } from "../firebase-config";
import { onSnapshot, doc } from "firebase/firestore";

export const RoomContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "owner":
      return { ...state, owner: action.payload };
    case "messages":
      return { ...state, messages: action.payload };
    case "members":
      return { ...state, members: action.payload };
  }
};

export default function RoomContextProvider({ children }) {
  const [roomData, dispatch] = useReducer(reducer, {
    name: "",
    owner: "",
    messages: [],
    members: [],
  });

  const selectRoom = (name) => {
    dispatch({ type: "name", payload: name });
  };

  const getMembers = () => {
    onSnapshot(doc(firestoreDb, "Rooms", roomData.name), (doc) => {
      dispatch({ type: "members", payload: doc.data().members });
      dispatch({ type: "owner", payload: doc.data().creatorId });
    });
  };

  const getMessages = () => {
    onSnapshot(doc(firestoreDb, "Rooms", roomData.name), (doc) => {
      dispatch({ type: "messages", payload: doc?.data().messages });
    });
  };

  useEffect(() => {
    if (roomData.name) {
      getMembers();
      getMessages();
    }
  }, [roomData.name]);

  return (
    <RoomContext.Provider value={{ selectRoom, roomData }}>
      {children}
    </RoomContext.Provider>
  );
}
