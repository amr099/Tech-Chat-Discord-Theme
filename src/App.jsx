import { useContext, useState, Suspense, lazy } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { GlobalStyle } from "src/GlobalStyles";
import { SnackContext } from "src/context/SnackContext";
import UsersContextProvider from "src/context/UsersContext";
import RoomContextProvider from "src/context/RoomContext";
import Snackbar from "src/components/Snackbar";
import Loading from "src/components/Loading";
import Header from "src/components/Header/Header";
import Rooms from "src/components/Rooms/Rooms";
import ChatWindow from "src/components/ChatWindow/ChatWindow";
import Members from "src/components/Members/Members";

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
`;

const GridItem = styled.div`
    grid-column: ${(props) => props.col};
`;
Modal.setAppElement("#root");

function App() {
    const [membersWindow, setMembersWindow] = useState(false);
    const { snackData } = useContext(SnackContext);

    const toggleMembersWindow = () => {
        setMembersWindow(!membersWindow);
    };
    return (
        <>
            <GlobalStyle />
            <Header />
            <Grid>
                <UsersContextProvider>
                    <RoomContextProvider>
                        <GridItem col={"1/4"}>
                            <Suspense fallback={<Loading />}>
                                <Rooms />
                            </Suspense>
                        </GridItem>
                        <GridItem col={membersWindow ? "4/11" : "4/13"}>
                            <Suspense>
                                <ChatWindow
                                    membersWindow={membersWindow}
                                    toggleMembersWindow={toggleMembersWindow}
                                />
                            </Suspense>
                        </GridItem>
                        {membersWindow && (
                            <GridItem col={"11/13"}>
                                <Suspense fallback={<Loading />}>
                                    <Members />
                                </Suspense>
                            </GridItem>
                        )}
                    </RoomContextProvider>
                </UsersContextProvider>
                {snackData?.show && <Snackbar />}
            </Grid>
        </>
    );
}

export default App;
