import CreateRoom from "CreateRoom";
import GetRoomMessages from "GetRoomMessages";
import GoogleAuth from "GoogleAuth";
import { useContext } from "react";
import SendMessage from "SendMessage";
import Users from "Users";
import { AuthContext } from "./AuthContext";
import Rooms from "./Rooms";
import Notification from "./Notification";

function App() {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <>
            <GoogleAuth />
            <h1>{user && user?.displayName}</h1>
            <Notification />
            <CreateRoom />
            <Rooms />
            <SendMessage />
            <GetRoomMessages />
            <Users />
        </>
    );
}

export default App;
