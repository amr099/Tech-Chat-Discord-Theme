import CreateRoom from "CreateRoom";
import GetRoomMessages from "Messages";
import { useContext, useState, useEffect } from "react";
import SendMessage from "SendMessage";
import Users from "Users";
import { AuthContext } from "./AuthContext";
import Rooms from "./Rooms";
import Notification from "./Notification";
import { ref, onValue } from "firebase/database";
import { db } from "./../firebase-config";
import Login from "./Login";
import Header from "Header";
import ChatWindow from "ChatWindow";
import styled from "styled-components";
import { GlobalStyle } from "GlobalStyles";

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
`;

const RoomsContainer = styled.div`
    grid-column: 1/4;
`;
const ChatContainer = styled.div`
    grid-column: 4/13;
    width: 98%;
    justify-self: center;
`;

const Container = styled.div`
    height: 100vh;
`;

function App() {
    return (
        <>
            <GlobalStyle />
            <Container>
                <Header />
                <Grid>
                    <RoomsContainer>
                        <Rooms />
                    </RoomsContainer>
                    <ChatContainer>
                        <ChatWindow />
                    </ChatContainer>
                </Grid>
            </Container>
            {/* <Users /> */}
            {/* <Login /> */}
            {/*<h1>{user && user?.displayName}</h1>
            <h1>
                My Rooms : <ul>{joinedRooms}</ul>
            </h1>
            <Notification />
            <CreateRoom />
            <Rooms />
            <SendMessage />
            <GetRoomMessages />
            <Users /> */}
        </>
    );
}

export default App;
