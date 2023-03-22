import CreateRoom from "CreateRoom";
import GetRoomMessages from "GetRoomMessages";
import GoogleAuth from "GoogleAuth";
import { useContext } from "react";
import SendMessage from "SendMessage";
import { AuthContext } from "./AuthContext";

function App() {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <>
            <GoogleAuth />
            <h1>{user && user?.email}</h1>
            <CreateRoom />
            <GetRoomMessages />
            <SendMessage />
        </>
    );
}

export default App;
