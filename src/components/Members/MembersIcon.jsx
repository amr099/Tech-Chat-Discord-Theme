import React from "react";
import styled from "styled-components";

const I = styled.i`
    float:right;
    margin-right:1rem;
    font-size: 2rem;
`;

export default function MembersIcon({ membersWindow, toggleMembersWindow }) {
    return (
        <I
            className={membersWindow ? "bi bi-people-fill" : "bi bi-people"}
            onClick={toggleMembersWindow}
        ></I>
    );
}
