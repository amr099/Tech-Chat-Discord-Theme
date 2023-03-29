import { useEffect } from "react";
import Rooms from "components/Rooms";
import Header from "components/Header";
import ChatWindow from "components/ChatWindow";
import styled from "styled-components";
import { GlobalStyle } from "components/GlobalStyles";
import { useContext } from "react";
import { UsersContext } from "./context/UsersContext";

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
        </>
    );
}

export default App;
