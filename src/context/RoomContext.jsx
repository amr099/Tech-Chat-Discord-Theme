import React, { createContext, useState, useEffect, useReducer } from "react";
import { onValue, ref } from "firebase/database";
import { db, firestoreDb } from "../firebase-config";
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
            console.log(roomData.owner);
        });
    };
    const getMessages = () => {
        const messages = ref(db, `messages/${roomData.name}/`);
        onValue(messages, async (snapshot) => {
            const data = await snapshot.val();
            let messages = [];
            for (let i in data) {
                messages.push(data[i]);
            }
            messages?.sort((a, b) => {
                const date1 = new Date(a.time);
                const date2 = new Date(b.time);
                return date1 - date2;
            });
            dispatch({ type: "messages", payload: messages });
            console.log(roomData.messages);
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
