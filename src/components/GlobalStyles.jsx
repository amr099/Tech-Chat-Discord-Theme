import React from "react";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body{
        margin:0;
        font-family:sans-serif;
    }

    button{
        all: unset;
    }

    i{
        font-size:2rem;
        &:hover{
            cursor:pointer;
        }
    }

    .bi-bell{
        margin-right:2rem; 
    }

    ::placeholder{
        color:#CFCFCF;
    }

    .bi-plus
    {
        &:hover{
        background-color:#292929;
        color:#fff;
        border-radius:5px;
}
    `;
