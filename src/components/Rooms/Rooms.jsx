import React from "react";
import styled from "styled-components";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import CreateRoom from "src/components/Rooms/CreateRoom";
import Room from "src/components/Rooms/Room";
import { firestoreDb } from "src/firebase-config";

const Container = styled.div`
    height: 93vh;
    overflow: auto;
    border-right: 3px solid #f4f4f4;
`;

export default function Rooms() {
    const [rooms, loading, error, onSnap] = useCollectionData(
        collection(firestoreDb, "Rooms")
    );

    return (
        <>
            <Container>
                <CreateRoom rooms={rooms} />
                {rooms?.map((room) => {
                    return (
                        <Room
                            key={room.name}
                            name={room.name}
                            creatorId={room.creatorId}
                            lastMsg={room.lastMsg?.msg}
                            lastMsgTime={room.lastMsg?.time}
                        />
                    );
                })}
            </Container>
        </>
    );
}
