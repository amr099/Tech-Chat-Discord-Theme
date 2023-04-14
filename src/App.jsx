import { useContext, useState } from "react";
import Rooms from "components/Rooms";
import Header from "components/Header";
import ChatWindow from "components/ChatWindow";
import styled from "styled-components";
import { GlobalStyle } from "components/GlobalStyles";
import Modal from "react-modal";
import Members from "components/Members";
import Snackbar from "components/Snackbar";
import { SnackContext } from "context/SnackContext";
import Loading from "./components/Loading";

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
    const { show } = useContext(SnackContext);
    return (
        <>
            <GlobalStyle />
            <Header />
            <Grid>
                <GridItem col={"1/4"}>
                    <Rooms />
                </GridItem>
                <GridItem col={membersCon ? "4/11" : "4/13"}>
                    <ChatWindow
                        membersCon={membersCon}
                        setMembersCon={setMembersCon}
                    />
                </GridItem>
                {membersCon && (
                    <GridItem col={"11/13"}>
                        <Members />
                    </GridItem>
                )}
                {show && <Snackbar />}
            </Grid>
        </>
    );
}

export default App;
