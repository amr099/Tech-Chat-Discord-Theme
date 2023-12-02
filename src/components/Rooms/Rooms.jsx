import React from "react";
import styled from "styled-components";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import CreateRoom from "src/components/Rooms/CreateRoom";
import Room from "src/components/Rooms/Room";
import { firestoreDb } from "src/firebase-config";
import Loading from "../Loading";

const Container = styled.div`
    height: 100%;
    border-right: 1px solid var(--semi-dark);
    overflow-y: auto;
    padding: 0 0.5rem;
`;

export default function Rooms() {
    const [rooms, loading, error, onSnap] = useCollectionData(
        collection(firestoreDb, "Rooms")
    );

    return (
        <Container>
            <CreateRoom rooms={rooms} />
            {loading ? (
                <Loading />
            ) : (
                rooms?.map((room) => {
                    return (
                        <Room
                            key={room.name}
                            name={room.name}
                            creatorId={room.creatorId}
                            lastMsg={room.lastMsg?.msg}
                            lastMsgTime={room.lastMsg?.time}
                        />
                    );
                })
            )}
        </Container>
    );
}
