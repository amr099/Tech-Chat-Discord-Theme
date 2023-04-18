import { useContext, useState, Suspense, lazy } from "react";
// import Rooms from "components/Rooms";
// import Header from "components/Header";
// import ChatWindow from "components/ChatWindow";
// import Members from "components/Members";
import styled from "styled-components";
import { GlobalStyle } from "components/GlobalStyles";
import Modal from "react-modal";
import { SnackContext } from "context/SnackContext";
import UsersContextProvider from "./context/UsersContext";
import RoomContextProvider from "./context/RoomContext";
import Snackbar from "components/Snackbar";
const Rooms = lazy(() => import("components/Rooms"));
const Header = lazy(() => import("components/Header"));
const ChatWindow = lazy(() => import("components/ChatWindow"));
const Members = lazy(() => import("components/Members"));

import Loading from "components/Loading";

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
`;

const GridItem = styled.div`
    grid-column: ${(props) => props.col};
`;
Modal.setAppElement("#root");

function App() {
    const [membersCon, setMembersCon] = useState(false);
    const { snackData } = useContext(SnackContext);
    return (
        <>
            <GlobalStyle />
            <Suspense fallback={<Loading />}>
                <Header />
            </Suspense>
            <Grid>
                <UsersContextProvider>
                    <RoomContextProvider>
                        <GridItem col={"1/4"}>
                            <Suspense fallback={<Loading />}>
                                <Rooms />
                            </Suspense>
                        </GridItem>
                        <GridItem col={membersCon ? "4/11" : "4/13"}>
                            <Suspense>
                                <ChatWindow
                                    membersCon={membersCon}
                                    setMembersCon={setMembersCon}
                                />
                            </Suspense>
                        </GridItem>
                        {membersCon && (
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
