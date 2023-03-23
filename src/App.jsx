import CreateRoom from "CreateRoom";
import GetRoomMessages from "GetRoomMessages";
import { useContext, useState, useEffect } from "react";
import SendMessage from "SendMessage";
import Users from "Users";
import { AuthContext } from "./AuthContext";
import Rooms from "./Rooms";
import Notification from "./Notification";
import { ref, onValue } from "firebase/database";
import { db } from "./../firebase-config";
import Login from "./Login";

function App() {
    const { user } = useContext(AuthContext);
    const [joinedRooms, setJoinedRooms] = useState([]);

    useEffect(() => {
        const starCountRef = ref(db, `users/${user.displayName}/rooms/`);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            let rooms = [];
            for (let i in data) {
                rooms.push(data[i].name);
            }
            setJoinedRooms(rooms);
            console.log(joinedRooms);
        });
    }, [user]);

    return (
        <>
            <Login />
            <h1>{user && user?.displayName}</h1>
            <h1>
                My Rooms : <ul>{joinedRooms}</ul>
            </h1>
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
