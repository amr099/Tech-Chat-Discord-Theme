import { useContext, useState, Suspense, lazy } from "react";
import styled from "styled-components";
import { GlobalStyle } from "src/GlobalStyles";
import { SnackContext } from "src/context/SnackContext";
import RoomContextProvider from "src/context/RoomContext";
import Snackbar from "src/components/Snackbar";
import Loading from "src/components/Loading";
import Header from "src/components/Header/Header";
import Rooms from "src/components/Rooms/Rooms";
import ChatWindow from "src/components/ChatWindow/ChatWindow";
import Members from "src/components/Members/Members";

const Grid = styled.div`
    display: grid;
    gap: 0;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 8vh 92vh;
`;

const GridItem = styled.div`
    grid-column: ${(props) => props.col};
    grid-row: ${(props) => props.row};
`;

function App() {
    const [membersWindow, setMembersWindow] = useState(false);
    const { snackData } = useContext(SnackContext);

    const toggleMembersWindow = () => {
        setMembersWindow(!membersWindow);
    };
    return (
        <>
            <GlobalStyle />
            <Grid>
                <GridItem col={"1/13"} row={"1/2"}>
                    <Header />
                </GridItem>
                <RoomContextProvider>
                    <GridItem col={"1/4"} row={"2/3"}>
                        <Suspense fallback={<Loading />}>
                            <Rooms />
                        </Suspense>
                    </GridItem>
                    <GridItem col={membersWindow ? "4/11" : "4/13"} row={"2/3"}>
                        <Suspense>
                            <ChatWindow
                                membersWindow={membersWindow}
                                toggleMembersWindow={toggleMembersWindow}
                            />
                        </Suspense>
                    </GridItem>
                    {membersWindow && (
                        <GridItem col={"11/13"} row={"2/3"}>
                            <Suspense fallback={<Loading />}>
                                <Members />
                            </Suspense>
                        </GridItem>
                    )}
                </RoomContextProvider>
                {snackData?.show && <Snackbar />}
            </Grid>
        </>
    );
}

export default App;
